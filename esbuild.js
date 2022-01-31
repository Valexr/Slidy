import { build } from "esbuild";
import { derver } from "derver";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from 'svelte-preprocess';

const DEV = process.argv.includes('--dev');

const svelteOptions = {
    compilerOptions: {
        dev: DEV,
        css: false
    },
    preprocess: [
        sveltePreprocess({
            sourceMap: DEV,
            typescript: true,
        }),
    ],
};

build({
    entryPoints: ['www/src/main.ts'],
    outfile: 'www/public/build/bundle.js',
    sourcemap: DEV && 'inline',
    bundle: true,
    minify: false,
    incremental: DEV,
    external: ['../img/*'],
    plugins: [sveltePlugin(svelteOptions)],
    legalComments: 'none'
}).then(bundle => {
    DEV && derver({
        dir: 'www/public',
        port: 3339,
        host: '0.0.0.0',
        watch: ['www/public', 'www/src', 'packages/svelte/dist', 'packages/core/dist'],
        onwatch: async (lr, item) => {
            if (item !== 'www/public') {
                lr.prevent();
                bundle.rebuild().catch(err => lr.error(err.message, 'Svelte compile error'));
            }
        }
    });

});