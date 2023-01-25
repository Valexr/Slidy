import { build, context } from 'esbuild';
import { derver } from 'derver';
import { eslint } from '../../env/eslint.js';
import vue from 'esbuild-plugin-vue-next';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    legalComments: 'none',
    plugins: [vue(), eslint()],
    entryPoints: ['src/index.ts'],
    sourcemap: DEV ? 'inline' : false,
};
const derverConfig = {
    port: 3335,
    host: '0.0.0.0',
    dir: 'public',
    watch: ['public', 'src', 'node_modules/@slidy/core'],
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
    for (const key in builds) {
        await build({
            ...esbuildBase,
            ...builds[key],
            format: key,
        });
    }
}
