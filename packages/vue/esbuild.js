import { build } from 'esbuild';
import { derver } from 'derver';
import vuePlugin from 'esbuild-plugin-vue3';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    entryPoints: ['src/index.ts'],
    plugins: [vuePlugin()]
};
const derverConfig = {
    dir: 'dev/public',
    port: 3335,
    host: '0.0.0.0',
    watch: ['dev/public', 'dev/src/', 'src', 'node_modules/@slidy/core'],
};

if (DEV) {
    build({
        ...esbuildBase,
        entryPoints: ['dev/src/app.ts'],
        outfile: 'dev/public/build/bundle.js',
        minify: false,
        sourcemap: 'inline',
        incremental: true,
        loader: { '.svg': 'file' }
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev/public') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            outfile: "dist/slidy.cjs",
            format: 'cjs',
            ...esbuildBase,
        });
        await build({
            outfile: "dist/slidy.mjs",
            format: 'esm',
            ...esbuildBase,
        });
        await build({
            outfile: "dist/slidy.js",
            globalName: 'Slidy',
            format: 'iife',
            ...esbuildBase,
        });
    })();
}
