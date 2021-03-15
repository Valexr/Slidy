const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
    preprocess: sveltePreprocess({ includePaths: [path.join(__dirname, 'relative/path')] })
};