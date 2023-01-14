import { build, context } from 'esbuild';
import { derver } from 'derver';
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
};

const derverConfig = {
    dir: 'public',
    port: 3330,
    host: '0.0.0.0',
    watch: [
        'src',
        'public',
        'node_modules/@slidy/animation',
        'node_modules/@slidy/easing',
        'node_modules/@slidy/media',
        'node_modules/@slidy/plugins',
    ],
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

    if (DEV) {
        await ctx.rebuild();
        await ctx.watch();
        console.log('watching @slidy/core...');
    } else {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'public') {
                    lr.prevent();
                    ctx.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
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
