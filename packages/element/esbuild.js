import { build, context } from 'esbuild';
import eslint from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    format: 'esm',
    plugins: [eslint()],
    entryPoints: DEV ? ['@slidy/element', '@slidy/easing', '@slidy/animation'] : ['src/index.ts'],
    outdir: DEV ? 'public/build' : '',
    sourcemap: DEV ? 'inline' : false,
    legalComments: 'none',
    logLevel: 'info'
};

const builds = {
    cjs: {
        outfile: 'dist/index.cjs',
    },
    esm: {
        outfile: 'dist/index.mjs',
    },
    iife: {
        entryPoints: ['src/iife.ts'],
        outfile: 'dist/index.js',
        globalName: 'Slidy',
    },
};

if (DEV) {
    const ctx = await context(esbuildBase);

    await prepare('public/build');

    await ctx.watch();
    await ctx.serve({ servedir: 'public', port: 3333 });

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
