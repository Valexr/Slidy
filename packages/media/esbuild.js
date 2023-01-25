import { build, context } from 'esbuild';
import { eslint } from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    format: 'esm',
    plugins: [eslint()],
    entryPoints: ['src/index.ts'],
    outfile: './dist/index.mjs',
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
        globalName: 'SlidyMedia',
    },
};

if (DEV) {
    const ctx = await context(esbuildBase);
    await ctx.rebuild();
    await ctx.watch();
    console.log('watching @slidy/media...');
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
