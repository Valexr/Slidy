import { build } from 'esbuild';
import { eslint } from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    watch: DEV,
    minify: !DEV,
    incremental: DEV,
    plugins: [eslint()],
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
        globalName: 'SlidyPLugins',
    },
};

if (DEV) {
    build({
        ...esbuildBase,
        outfile: './dist/index.mjs',
        format: 'esm',
    }).then(() => console.log('watching @slidy/easing...'));
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
