import { build } from 'esbuild';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    watch: DEV,
    minify: !DEV,
    incremental: DEV,
    plugins: [eslintPlugin()],
    entryPoints: ['src/index.ts'],
    sourcemap: DEV && 'inline',
    legalComments: 'none',
};

const builds = {
    cjs: {
        outfile: './dist/index.cjs',
    },
    esm: {
        outfile: './dist/index.mjs',
    },
    iife: {
        outfile: './dist/index.js',
        globalName: 'Slidy',
    },
};

if (DEV) {
    build({
        ...esbuildBase,
        outfile: './dist/index.mjs',
        format: 'esm',
    }).then(() => console.log('watching @slidy/media...'));
} else {
    for (const key in builds) {
        build({
            ...esbuildBase,
            ...builds[key],
            format: key,
        });
    }
}
