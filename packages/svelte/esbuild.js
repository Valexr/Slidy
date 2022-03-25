import { build } from "esbuild";
import { derver } from "derver";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import cssmodules from "./cssmodules.js";
import transpile from "./transpilator.js";

const DEV = process.argv.includes("--dev");
const SVELTE = process.argv.includes("--svelte");

const svelteOptions = {
	compilerOptions: {
		dev: DEV || SVELTE,
		css: !SVELTE,
		immutable: true
	},
	preprocess: [
		sveltePreprocess({
			sourceMap: DEV || SVELTE,
			typescript: true
		})
	]
};

const cssModulesOptions = {
	transformClassName: ({ path, content, node }) => {
		// node - https://github.com/csstree/csstree/blob/bf05b963f85a08541c2991fa369f5bb613096db2/docs/ast.md
		return `${node.name}`;
	}
};

const esbuildBase = {
	entryPoints: ["src/index.ts"],
	bundle: true,
	minify: true,
	sourcemap: false,
	legalComments: "none",
	external: [
		"svelte",
		"svelte/*"
	],
	plugins: [
		sveltePlugin(svelteOptions),
		cssmodules(cssModulesOptions)
	]
};

const derverConfig = {
	dir: "public",
	port: 3331,
	host: "0.0.0.0",
	watch: [
		"public",
		"src",
		"dist"
	]
};

if (DEV) {
	build({
		...esbuildBase,
		outfile: "./dist/slidy.mjs",
		format: "esm",
		sourcemap: "inline",
		minify: false,
		incremental: true,
		watch: true,
	}).then(bundle => {
		console.log("Watching @slidy/svelte...");
	});
} else if (SVELTE) {
	build({
		entryPoints: ["src/dev/main.ts"],
		outfile: "public/build/bundle.js",
		platform: "browser",
		bundle: true,
		sourcemap: "inline",
		incremental: true,
		legalComments: "none",
		plugins: [
			sveltePlugin(svelteOptions),
			cssmodules(cssModulesOptions)
		],
	}).then((bundle) => {
		derver({
			...derverConfig,
			onwatch: async (lr, item) => {
				if (item !== "public") {
					lr.prevent();
					bundle.rebuild().catch(err => lr.error(err.message, "Svelte compile error"));
				}
			},
		});
	});
} else {
	(async () => {
		await build({
			...esbuildBase,
			outfile: "dist/slidy.cjs",
			format: "cjs",
		});
		await build({
			...esbuildBase,
			outfile: "dist/slidy.mjs",
			format: "esm",
		});
		await build({
			...esbuildBase,
			outfile: "dist/slidy.js",
			globalName: "slidy",
			format: "iife",
		});
		await transpile({
			input: "./src/",
			output: "./dist/",
			ext: [".svelte", ".ts"],
			exclude: ["dev", "types.ts", "images-api.ts"],
			replace: [["./slidy.module.css", "../../slidy.css"]],
			remove: ["images-api", "module.css"]
		});
	})();
}
