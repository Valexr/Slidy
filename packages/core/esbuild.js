import { build } from 'esbuild';
import { derver } from 'derver';
// import pkg from './package.json' assert { type: 'json' };

const DEV = process.argv.includes('--dev');
const CORE = process.argv.includes('--core');

const esbuildBase = {
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    entryPoints: ['src/slidy.ts'],
};
const derverConfig = {
    dir: 'dev',
    port: 3330,
    host: '0.0.0.0',
    watch: ['dev', 'src'],
};

if (DEV) {
    build({
        ...esbuildBase,
        outfile: './dist/slidy.mjs',
        format: 'esm',
        sourcemap: 'inline',
        minify: false,
        incremental: true,
        watch: true,
    }).then((bundle) => {
        console.log('watching @slidy/core...');
    });
} else if (CORE) {
    build({
        ...esbuildBase,
        minify: false,
        outfile: 'dev/dev.js',
        globalName: 'Slidy',
        format: 'iife',
        sourcemap: 'inline',
        incremental: true,
    }).then((bundle) => {
        derver({
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
    (async () => {
        await build({
            outfile: './dist/slidy.cjs',
            format: 'cjs',
            ...esbuildBase,
        });
        await build({
            outfile: './dist/slidy.mjs',
            format: 'esm',
            ...esbuildBase,
        });
        await build({
            outfile: './dist/slidy.js',
            globalName: 'Slidy',
            format: 'iife',
            ...esbuildBase,
        });
        await build({
            outfile: 'dev/dev.js',
            globalName: 'Slidy',
            format: 'iife',
            ...esbuildBase,
        });
    })();
}
