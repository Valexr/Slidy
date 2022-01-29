import { build } from "esbuild";
import { derver } from "derver";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from 'svelte-preprocess';

const DEV = process.argv.includes('--dev');

const options = {
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

async function build_client() {
    return await build({
        entryPoints: ['www/src/main.js'],
        outfile: 'www/public/build/bundle.js',
        sourcemap: DEV && 'inline',
        bundle: true,
        minify: !DEV,
        incremental: DEV,
        platform: 'browser',
        external: ['../img/*'],
        mainFields: ['svelte', 'module', 'main', 'browser'],
        plugins: [sveltePlugin(options)],
        logLevel: 'debug'
    });
}

const observed = ['www/public', 'www/src', 'packages/svelte/dist', 'packages/core/dist']

build_client().then(bundle => {
    if (DEV) {
        derver({
            dir: 'www/public',
            port: 3000,
            host: '0.0.0.0',
            watch: observed,
            onwatch: async (lr, item) => {
                if (item !== 'www/public') {
                    lr.prevent();
                    try {
                        await bundle.rebuild();
                    } catch (err) {
                        lr.error(err.message, 'Svelte compile error')
                    }
                }
            }
        })
    }
});
