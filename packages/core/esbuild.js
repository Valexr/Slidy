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
    sourcemap: (DEV || CORE) ? 'inline' : false,
    globalName: 'Slidy',
    format: 'esm'
};
const derverConfig = {
    dir: 'dev',
    port: 3330,
    host: '0.0.0.0',
    watch: ['dev', 'src', '../media/dist'],
};
const builds = {
    cjs: {
        outfile: './dist/index.cjs'
    },
    esm: {
        outfile: './dist/index.mjs'
    },
    iife: {
        outfile: './dist/index.js'
    },
    easing: {
        entryPoints: ['src/easing.ts'],
        outfile: './dist/easing.js'
    }
};

if (DEV || CORE) {
    build({
        ...esbuildBase,
        ...CORE
            ? {
                entryPoints: ['@slidy/core', '@slidy/media', 'src/easing.ts'],
                outdir: 'dev/build'
            }
            : { outfile: 'dist/index.mjs' },
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
    for (const key in builds) {
        build({
            ...esbuildBase,
            ...builds[key],
            format: key !== 'easing' ? key : 'esm'
        });
    }
}
