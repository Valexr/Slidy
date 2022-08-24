import { build } from 'esbuild';
import { eslintPlugin } from 'esbuild-plugin-eslinter';
import prepare from '../../env/prepare.js';

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
    globalName: 'Slidy',
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
    },
};

if (DEV) {
    build({
        ...esbuildBase,
        outfile: './dist/index.mjs',
        format: 'esm',
    }).then(() => console.log('watching @slidy/animation...'));
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
