const { build } = require("esbuild");
const { derver } = require("derver");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require('svelte-preprocess');
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');

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
        plugins: [
            sveltePlugin({
                compileOptions: {
                    dev: DEV,
                    css: false
                },
                preprocess: [
                    sveltePreprocess({
                        sourceMap: DEV,
                        defaults: {
                            markup: 'html',
                            script: 'js',
                            style: 'scss'
                        }
                    })
                ]
            })
        ]
    });
}


build_client().then(bundle => {
    if (DEV) {
        derver({
            dir: 'www/public',
            port: 5050,
            host: '0.0.0.0',
            watch: ['www/public', 'www/src', 'src'],
            onwatch: async (lr, item) => {
                if (item == 'www/src' || item == 'src') {
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

!DEV && (async () => {

    await build({
        entryPoints: ['src/index.js'],
        outfile: pkg.main,
        format: 'cjs',
        bundle: true,
        minify: true,
        sourcemap: false,
        external: ['svelte', 'svelte/*'],
        plugins: [sveltePlugin({ compileOptions: { css: true } })]
    });

    await build({
        entryPoints: ['src/index.js'],
        outfile: pkg.module,
        format: "esm",
        bundle: true,
        minify: true,
        sourcemap: false,
        external: ['svelte', 'svelte/*'],
        plugins: [sveltePlugin({ compileOptions: { css: true } })],
    });

})()
