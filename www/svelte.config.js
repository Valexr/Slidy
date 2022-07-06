import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";

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
			default: true
		}
	}
};

export default config;
