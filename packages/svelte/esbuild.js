import { build } from "esbuild";
import { derver } from "derver";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import cssmodules from "./cssmodules.js";
import transpile from "./transpilator.js";
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes("--dev");
const SVELTE = process.argv.includes("--svelte");

const svelteOptions = {
	compilerOptions: {
		dev: DEV || SVELTE,
		css: !SVELTE,
		immutable: true,
	},
	preprocess: [
		sveltePreprocess({
			sourceMap: DEV || SVELTE,
			typescript: true,
		}),
	],
};

const cssModulesOptions = {
	transformClassName: ({ path, content, node }) => {
		// node - https://github.com/csstree/csstree/blob/bf05b963f85a08541c2991fa369f5bb613096db2/docs/ast.md
		return `${node.name}`;
	},
};

const esbuildBase = {
	watch: DEV,
	bundle: true,
	globalName: "slidy",
	legalComments: "none",
	minify: !DEV && !SVELTE,
	incremental: DEV || SVELTE,
	entryPoints: ["src/index.ts"],
	sourcemap: (DEV || SVELTE) && "inline",
	external: !SVELTE ? ["svelte", "svelte/*"] : [],
	plugins: [
		sveltePlugin(svelteOptions),
		cssmodules(cssModulesOptions),
		// copy([
		// 	{ from: '../../assets/actions', to: 'actions' }
		// ]),
	],
};

const derverConfig = {
	dir: "public",
	port: 3331,
	host: "0.0.0.0",
	watch: ["public", "src", "node_modules/@slidy"],
};

const builds = {
	cjs: {
		outfile: "dist/slidy.cjs",
	},
	esm: {
		outfile: "dist/slidy.mjs",
	},
	iife: {
		outfile: "dist/slidy.js",
	},
};

if (DEV) {
	build({
		...esbuildBase,
		outfile: "./dist/slidy.mjs",
		format: "esm",
	}).then((bundle) => {
		console.log("Watching @slidy/svelte...");
	});
} else if (SVELTE) {
	build({
		...esbuildBase,
		entryPoints: ["src/dev/main.ts"],
		outfile: "public/build/bundle.js",
		platform: "browser",
	}).then((bundle) => {
		derver({
			...derverConfig,
			onwatch: async (lr, item) => {
				if (item !== "public") {
					lr.prevent();
					bundle.rebuild().catch((err) => lr.error(err.message, "Svelte compile error"));
				}
			},
		});
	});
} else {
	(async () => {
		await prepare();

		for (const key in builds) {
			await build({
				...esbuildBase,
				...builds[key],
				format: key,
			});
		}

		await build({
			...esbuildBase,
			entryPoints: ["@slidy/assets/actions", "@slidy/assets/scripts"],
			outdir: "dist/assets",
			format: "esm",
		});

	})().then(() => {

		transpile({
			input: "./src/",
			output: "./dist/",
			ext: [".svelte", ".ts"],
			exclude: ["dev", "types.ts", "images-api.ts"],
			replace: [["./slidy.module.css", "../../slidy.css"], ["@slidy/assets", "../../assets"]],
			remove: ["images-api", "module.css"],
		});

	});
}
