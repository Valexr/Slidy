import { build, context } from 'esbuild';
import eslint from '../../env/eslint.js';
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
    logLevel: 'info'
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

    await ctx.watch();
    await ctx.serve({ servedir: 'public', port: 3332 });

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
