import { build, context } from 'esbuild';
import { solidPlugin } from 'esbuild-plugin-solid';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

/** @type { import('esbuild').BuildOptions } */
const esbuildBase = {
    bundle: true,
    minify: !DEV,
    legalComments: 'none',
    plugins: [solidPlugin()],
    entryPoints: ['src/index.tsx'],
    sourcemap: DEV ? 'inline' : false,
    external: DEV ? [] : ['solid-js'],
    logLevel: 'info'
};

const builds = {
    esm: {
        format: 'esm',
        outfile: './dist/slidy.mjs',
    },
    jsx: {
        plugins: [],
        format: 'esm',
        jsx: 'preserve',
        outfile: './dist/slidy.jsx',
    },
    iife: {
        format: 'iife',
        outfile: './dist/slidy.js',
        globalName: 'SlidySolid',
    }
};

if (DEV) {
    const ctx = await context({
        ...esbuildBase,
        entryPoints: ['src/dev/index.tsx'],
        outfile: 'public/build/bundle.js',
        loader: { '.svg': 'dataurl' },
    });

    await ctx.watch();
    await ctx.serve({ servedir: 'public', port: 3334 });

} else {
    await prepare();

    for (const key in builds) {
        await build({
            ...esbuildBase,
            ...builds[key],
        });
    }

}
