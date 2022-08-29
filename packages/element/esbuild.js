import { build } from 'esbuild';
import { derver } from 'derver';
import { eslintPlugin } from 'esbuild-plugin-eslinter';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    incremental: DEV,
    legalComments: 'none',
    plugins: [eslintPlugin()],
    entryPoints: DEV
        ? ['@slidy/element', '@slidy/core', '@slidy/media', '@slidy/easing', '@slidy/animation']
        : ['src/index.ts'],
    outdir: DEV ? 'public/build' : '',
    sourcemap: DEV ? 'inline' : false,
    format: 'esm',
};
const derverConfig = {
    dir: 'public',
    port: 3333,
    host: '0.0.0.0',
    watch: [
        'src',
        'public',
        'node_modules/@slidy/animation',
        'node_modules/@slidy/core',
        'node_modules/@slidy/easing',
        'node_modules/@slidy/media',
    ],
};
const builds = {
    cjs: {
        outfile: 'dist/index.cjs',
    },
    esm: {
        outfile: 'dist/index.mjs',
    },
    iife: {
        entryPoints: ['src/iife.ts'],
        outfile: 'dist/index.js',
        globalName: 'Slidy',
    },
};

if (DEV) {
    build(esbuildBase).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'public') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
} else {
    prepare().then(() => {
        for (const key in builds) {
            build({
                ...esbuildBase,
                ...builds[key],
                format: key,
            });
        }
    });
}
