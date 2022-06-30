import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		mdsvex(),
		preprocess()
	],
	extensions: [ ".svelte", ".svx" ],
	kit: {
		// alias: {
		//     "@slidy/svelte": path.resolve("../packages/svelte/src/index.ts"),
		//     "@slidy/media": path.resolve("../packages/media/src/index.ts")
		// },
		adapter: adapter({
			// default options are shown
			pages: "build",
			assets: "build",
			fallback: null,
			precompress: false
		}),
		prerender: {
			// This can be false if you"re using a fallback (i.e. SPA mode)
			default: false
		},
		vite: {
			server: {
				port: 3339
			}
		}
	}
};

export default config;
