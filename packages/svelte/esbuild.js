import { build, context } from "esbuild";
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
		css: !SVELTE ? 'injected' : 'external',
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
	bundle: true,
	globalName: "slidy",
	minify: !DEV && !SVELTE,
	entryPoints: ["src/index.ts"],
	sourcemap: (DEV || SVELTE) && "inline",
	external: !SVELTE ? ["svelte", "svelte/*"] : [],
	plugins: [
		sveltePlugin(svelteOptions),
		cssmodules(cssModulesOptions),
	],
	legalComments: "none",
	logLevel: 'info'
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
	const ctx = await context({
		...esbuildBase,
		outfile: "./dist/slidy.mjs",
		format: "esm",
	});

	await ctx.rebuild();
	await ctx.watch();
	console.log('watching @slidy/svelte...');

} else if (SVELTE) {

	const ctx = await context({
		...esbuildBase,
		entryPoints: ["src/dev/main.ts"],
		outfile: "public/build/bundle.js",
		platform: "browser",
	});

	await ctx.watch();
	await ctx.serve({ servedir: 'public', port: 3331 });

} else {

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
		entryPoints: [
			"@slidy/assets/actions",
			"@slidy/assets/scripts/utils",
			"@slidy/assets/scripts/navigation",
			"@slidy/assets/icons",
			"@slidy/assets/i18n"
		],
		outdir: "dist/assets",
		format: "esm",
	});

	transpile({
		input: "./src/",
		output: "./dist/",
		ext: [".svelte", ".ts"],
		exclude: ["dev", "types.ts", "images-api.ts"],
		replace: [["./slidy.module.css", "../../slidy.css"], ["@slidy/assets", "../../assets"]],
		remove: ["images-api", "module.css"],
	});

}
