import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter({
            // default options are shown
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false
        }),

        prerender: {
            // This can be false if you're using a fallback (i.e. SPA mode)
            default: true
        },
        vite: () => ({
            server: {
                port: 3339,
            }
        }),
    }
};

export default config;
