import { build } from 'esbuild';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    watch: DEV,
    minify: !DEV,
    incremental: DEV,
    entryPoints: ['src/index.ts'],
    sourcemap: DEV && 'inline',
    legalComments: 'none',
};

if (DEV) {
    build({
        ...esbuildBase,
        outfile: './dist/index.mjs',
        format: 'esm'
    }).then(() => console.log('watching @slidy/media...'));
} else {
    (async () => {
        await build({
            ...esbuildBase,
            outfile: './dist/index.cjs',
            format: 'cjs',
        });
        await build({
            ...esbuildBase,
            outfile: './dist/index.mjs',
            format: 'esm',
        });
        await build({
            ...esbuildBase,
            outfile: './dist/index.js',
            globalName: 'MediaStorage',
            format: 'iife',
        });
    })();
}
