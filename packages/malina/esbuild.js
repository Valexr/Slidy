import { build, context } from 'esbuild';
import malina from './malina.js';
import eslint from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    format: 'esm',
    legalComments: 'none',
    minify: !DEV,
    plugins: [eslint(), malina()],
    entryPoints: DEV ? ['src/dev/main.js'] : ['src/index.js'],
    outdir: DEV ? 'public/build' : '',
    sourcemap: DEV ? 'inline' : false,
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
        entryPoints: ['src/iife.js'],
        outfile: 'dist/index.js',
        globalName: 'SlidyMalina',
    },
};


if (DEV) {
    const ctx = await context(esbuildBase);

    await ctx.watch();
    await ctx.serve({ servedir: 'public', port: 3336 });
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
