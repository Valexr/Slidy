const { build } = require("esbuild");
const { derver } = require("derver");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require('svelte-preprocess');
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');
const DEPLOY = process.argv.includes('--deploy');

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
                compilerOptions: {
                    dev: DEV,
                    css: false,
                    immutable: false
                },
                preprocess: [
                    sveltePreprocess({
                        sourceMap: DEV
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
            port: 3000,
            host: '0.0.0.0',
            watch: ['www/public', 'www/src', 'src'],
            onwatch: async (lr, item) => {
                if (item == 'www/src' || item == 'src') {
                    lr.prevent();
                    try {
                        await bundle.rebuild();
                    } catch (err) {
                        lr.error(err.message, 'Svelte compile error');
                    }
                }
            }
        });
    }
});

!DEPLOY && (async () => await build_client())();

!DEV && (async () => {

    await build({
        entryPoints: ['src/index.js'],
        outfile: pkg.main,
        format: 'cjs',
        bundle: true,
        minify: true,
        sourcemap: false,
        external: ['svelte', 'svelte/*'],
        plugins: [sveltePlugin({ compilerOptions: { css: true, immutable: true } })]
    });

    await build({
        entryPoints: ['src/index.js'],
        outfile: pkg.module,
        format: "esm",
        bundle: true,
        minify: true,
        sourcemap: false,
        external: ['svelte', 'svelte/*'],
        plugins: [sveltePlugin({ compilerOptions: { css: true, immutable: true } })],
    });

})();
