import adapter from '@sveltejs/adapter-static';
// import { sveltePreprocess } from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { mdsvexConfig } from './mdsvex.config.js';

const dev = process.env.npm_lifecycle_event === 'dev';

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],
    extensions: ['.svelte', '.svx'],
    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        paths: {
            base: dev ? '' : '/Slidy'
        },
        alias: {
            '@components': './src/lib/components',
            '@lib': './src/lib',
            '@paths': './src/core/paths.ts',
            '@styles': './src/lib/styles',
            '@stores': './src/lib/stores',
            '@utils': './src/lib/utils',
            '@types': './src/types',
        },
        prerender: { handleMissingId: 'warn' }
    }
};

export default config;
