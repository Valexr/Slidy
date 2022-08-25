import { build } from 'esbuild';
import { derver } from 'derver';
import { solidPlugin } from 'esbuild-plugin-solid';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

/** @type { import('esbuild').BuildOptions } */
const esbuildBase = {
    bundle: true,
    minify: !DEV,
    incremental: DEV,
    legalComments: 'none',
    plugins: [solidPlugin()],
    entryPoints: ['src/index.tsx'],
    sourcemap: DEV ? 'inline' : false,
    external: DEV ? [] : ['solid-js'],
};
const derverConfig = {
    port: 3336,
    host: '0.0.0.0',
    dir: 'public',
    watch: [
        'public',
        'src',
        'node_modules/@slidy/animation',
        'node_modules/@slidy/assets',
        'node_modules/@slidy/core',
        'node_modules/@slidy/easing',
    ],
};
const builds = {
    cjs: {
        outfile: './dist/slidy.cjs',
    },
    esm: {
        outfile: './dist/slidy.mjs',
    },
    iife: {
        outfile: './dist/slidy.js',
        globalName: 'Slidy',
    },
};

if (DEV) {
    build({
        ...esbuildBase,
        entryPoints: ['src/dev/index.tsx'],
        outfile: 'public/build/bundle.js',
        loader: { '.svg': 'dataurl' },
    }).then((bundle) => {
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
