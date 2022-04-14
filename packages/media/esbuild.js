import { build } from 'esbuild';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    watch: DEV,
    bundle: true,
    legalComments: 'none',
    minify: !DEV,
    incremental: DEV,
    plugins: [eslintPlugin()],
    entryPoints: ['src/index.ts'],
    sourcemap: DEV && 'inline'
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
