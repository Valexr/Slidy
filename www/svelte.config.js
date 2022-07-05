import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import path from "path";

const aliases = [
	{ name: "@components", path: "./src/lib/components" },
	{ name: "@lib", path: "./src/lib" },
	{ name: "@paths", path: "./src/core/paths.ts" },
	{ name: "@styles", path: "./src/lib/styles" },
	{ name: "@stores", path: "./src/lib/stores" },
	{ name: "@utils", path: "./src/lib/utils" },
	{ name: "@types", path: "./src/types" }
];

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: [
		mdsvex(),
		preprocess()
	],
	extensions: [ ".svelte", ".svx" ],
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: null,
			precompress: false
		}),
		prerender: {
			default: false
		},
		vite: {
			resolve: {
				alias: Object.fromEntries(aliases.map(alias => (
					[ alias.name, path.resolve(alias.path) ]
				)))
			},
			server: {
				port: 3339
			}
		}
	}
};

export default config;
