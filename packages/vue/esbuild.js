import { build, context } from 'esbuild';
import eslint from '../../env/eslint.js';
import vue from 'esbuild-plugin-vue-next';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    legalComments: 'none',
    plugins: [vue(), eslint()],
    entryPoints: ['src/index.ts'],
    sourcemap: DEV ? 'inline' : false,
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
        entryPoints: ['public/app.ts'],
        outfile: 'public/build/bundle.js',
        loader: { '.svg': 'file' },
    });

    await ctx.watch();
    await ctx.serve({ servedir: 'public', port: 3335 });

} else {
    for (const key in builds) {
        await build({
            ...esbuildBase,
            ...builds[key],
            format: key,
        });
    }
}
