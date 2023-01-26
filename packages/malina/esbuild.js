import { build, context } from 'esbuild';
import { derver } from 'derver';
import malina from './malina.js';
import { eslint } from '../../env/eslint.js';
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
};

const derverConfig = {
    dir: 'public',
    port: 3336,
    host: '0.0.0.0',
    watch: [
        'src',
        'public',
        'node_modules/@slidy/core',
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
        entryPoints: ['src/iife.js'],
        outfile: 'dist/index.js',
        globalName: 'SlidyMalina',
    },
};


if (DEV) {
    const ctx = await context(esbuildBase);

    await prepare('public/build');

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
