import { build, context } from 'esbuild';
import { derver } from 'derver';
import { eslint } from '../../env/eslint.js';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    format: 'esm',
    legalComments: 'none',
    plugins: [eslint()],
    entryPoints: DEV ? ['@slidy/element', '@slidy/easing', '@slidy/animation'] : ['src/index.ts'],
    outdir: DEV ? 'public/build' : '',
    sourcemap: DEV ? 'inline' : false,
};

const derverConfig = {
    dir: 'public',
    port: 3333,
    host: '0.0.0.0',
    watch: [
        'src',
        'public',
        'node_modules/@slidy/animation',
        'node_modules/@slidy/core',
        'node_modules/@slidy/easing',
        'node_modules/@slidy/media',
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
