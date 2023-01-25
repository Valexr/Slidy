import { build, context } from 'esbuild';
import { derver } from 'derver';
import { eslint } from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

/** @type {import('esbuild').BuildOptions} */
const esbuildBase = {
    bundle: true,
    minify: !DEV,
    legalComments: 'none',
    plugins: [eslint()],
    entryPoints: ['src/index.tsx'],
    sourcemap: DEV ? 'inline' : false,
    external: DEV ? [] : ['react', 'react-dom'],
    // inject: ['./react-shim.ts'],
    jsx: 'automatic',
};
const derverConfig = {
    port: 3332,
    host: '0.0.0.0',
    dir: 'public',
    watch: [
        'src',
        'public',
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
    const ctx = await context({
        ...esbuildBase,
        entryPoints: ['src/dev/index.tsx'],
        outfile: 'public/build/bundle.js',
        loader: { '.svg': 'dataurl' },
    });

    derver({
        ...derverConfig,
        onwatch: async (lr, item) => {
            if (item !== 'public') {
                lr.prevent();
                ctx.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
            }
        },
    });

} else {
    await prepare();

    for (const key in builds) {
        await build({
            ...esbuildBase,
            ...builds[key],
            format: key,
        });
    }

}
