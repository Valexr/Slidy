import { build, context } from 'esbuild';
import { eslint } from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');
const CORE = process.argv.includes('--core');

const esbuildBase = {
    bundle: true,
    format: 'esm',
    legalComments: 'none',
    minify: !DEV && !CORE,
    plugins: [eslint()],
    entryPoints: CORE
        ? ['@slidy/core', '@slidy/media', '@slidy/easing', '@slidy/animation', '@slidy/plugins']
        : ['src/index.ts'],
    outdir: CORE ? 'public/build' : '',
    outfile: !CORE ? 'dist/index.mjs' : '',
    sourcemap: DEV || CORE ? 'inline' : false,
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


if (DEV || CORE) {
    const ctx = await context(esbuildBase);

    process.on('SIGTERM', ctx.dispose);
    process.on("exit", ctx.dispose);

    if (DEV) {
        await ctx.rebuild();
        await ctx.watch();
        console.log('watching @slidy/core...');
    } else {
        await ctx.watch();
        await ctx.serve({ servedir: 'public', port: 3330 });
    }
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
