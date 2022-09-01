import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { mdsvexConfig } from './mdsvex.config.js';

const dev = process.env.npm_lifecycle_event === 'dev';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: [mdsvex(mdsvexConfig), preprocess()],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '200.html',
			precompress: false
		}),
		trailingSlash: 'always',
		paths: {
			base: dev ? '' : '/Slidy'
		}
	}
};

export default config;
