const esbuild = require('esbuild');
const sveltePlugin = require('esbuild-svelte');
const pkg = require('./package.json');

(async () => {

	await esbuild.build({
		entryPoints: ['src/index.js'],
		outfile: pkg.main,
		format: 'cjs',
		bundle: true,
		minify: true,
		sourcemap: false,
		external: ['svelte', 'svelte/*'],
		plugins: [sveltePlugin({ compileOptions: { css: true } })]
	});

	await esbuild.build({
		entryPoints: ['src/index.js'],
		outfile: pkg.module,
		format: "esm",
		bundle: true,
		minify: true,
		sourcemap: false,
		external: ['svelte', 'svelte/*'],
		plugins: [sveltePlugin({ compileOptions: { css: true } })],
	});

	await esbuild.build({
		entryPoints: ['src/index.js'],
		outfile: pkg.browser,
		platform: 'browser',
		format: "iife",
		bundle: true,
		minify: true,
		sourcemap: false,
		globalName: "svelteSLidy",
		plugins: [sveltePlugin({ compileOptions: { css: true } })],
	});

})()
