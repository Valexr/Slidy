const { build } = require("esbuild");
const { derver } = require("derver");
const sveltePlugin = require("esbuild-svelte");
const { sveltePaths } = require('esbuild-svelte-paths');
const sveltePreprocess = require('svelte-preprocess');
const { reactivePreprocess } = require("svelte-reactive-preprocessor");

const DEV = process.argv.includes('--dev');

function fix_svelte_path() {
	return {
		name: 'fix_svelte_path',
		setup(b) {
			const path = require('path')
			b.onResolve({ filter: /^svelte$|^svelte\// }, args => {
				return { path: path.join(__dirname, 'node_modules', args.path, 'index.mjs') }
			});
		}
	}
}

async function build_client() {
	return await build({
		entryPoints: ['src/main.js'],
		outfile: 'public/build/bundle.js',
		sourcemap: DEV && 'inline',
		bundle: true,
		minify: !DEV,
		incremental: DEV,
		platform: 'browser',
		loader: {
			'.svg': 'file',
			// '.css': 'file'
		},
		mainFields: ['svelte', 'module', 'main', 'browser'],
		plugins: [
			fix_svelte_path(),
			sveltePaths(),
			sveltePlugin({
				compileOptions: {
					dev: DEV,
					css: false
				},
				preprocessor: [
					sveltePreprocess({
						sourceMap: DEV,
						defaults: {
							markup: 'html',
							script: 'js',
							style: 'scss'
						}
					}),
					// reactivePreprocess({
					// 	enabled: DEV
					// })
				]
			})
		]
	});
}


build_client().then(bundle => {
	if (DEV) {
		derver({
			dir: 'public',
			port: 5000,
			watch: ['public', 'src', '../src'],
			onwatch: async (lr, item) => {
				if (item == 'src' || item == '../src') {
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
