import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

const aliases = [
    { name: '@components', path: './src/lib/components' },
    { name: '@lib', path: './src/lib' },
    { name: '@paths', path: './src/core/paths.ts' },
    { name: '@styles', path: './src/lib/styles' },
    { name: '@stores', path: './src/lib/stores' },
    { name: '@utils', path: './src/lib/utils' },
    { name: '@types', path: './src/types' }
];

/** @type {import("vite").UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: Object.fromEntries(aliases.map((alias) => [alias.name, path.resolve(alias.path)]))
    },
    server: {
        port: 3339
    }
};

export default config;
