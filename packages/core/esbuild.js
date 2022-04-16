import { build } from 'esbuild';
import { derver } from 'derver';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');
const CORE = process.argv.includes('--core');

const esbuildBase = {
    watch: DEV,
    bundle: true,
    legalComments: 'none',
    minify: !DEV && !CORE,
    incremental: DEV || CORE,
    plugins: [eslintPlugin()],
    entryPoints: ['src/index.ts'],
    sourcemap: (DEV || CORE) ? 'inline' : false
};
const derverConfig = {
    dir: 'dev',
    port: 3330,
    host: '0.0.0.0',
    watch: ['dev', 'src', '../media/dist'],
};
const builds = {
    cjs: {
        outfile: './dist/slidy.cjs'
    },
    esm: {
        outfile: './dist/slidy.mjs'
    },
    iife: {
        outfile: './dist/slidy.js',
        globalName: 'Slidy'
    }
};

if (DEV || CORE) {
    build({
        ...esbuildBase,
        ...CORE
            ? {
                entryPoints: ['@slidy/core', '@slidy/media'],
                outdir: 'dev/build'
            }
            : { outfile: 'dist/slidy.mjs' },
        format: 'esm',
        globalName: 'Slidy'
    }).then((bundle) => {
        if (DEV) console.log('watching @slidy/core...');
        else derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
} else {
    Object.keys(builds).forEach(key => {
        build({
            ...esbuildBase,
            ...builds[key],
            format: key
        });
    });
}
