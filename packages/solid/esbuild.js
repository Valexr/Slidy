import { build } from 'esbuild';
import { derver } from 'derver';
import { solidPlugin } from 'esbuild-plugin-solid';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

/** @type { import('esbuild').BuildOptions } */
const esbuildBase = {
    bundle: true,
    minify: !DEV,
    incremental: DEV,
    legalComments: 'none',
    plugins: [solidPlugin()],
    entryPoints: ['src/index.tsx'],
    sourcemap: DEV ? 'inline' : false,
    external: DEV ? [] : ['solid-js'],
};

const derverConfig = {
    port: 3334,
    host: '0.0.0.0',
    dir: 'public',
    watch: [
        'src',
        'public',
        'node_modules/@slidy/animation',
        'node_modules/@slidy/assets',
        'node_modules/@slidy/core',
        'node_modules/@slidy/easing',
    ],
};

if (DEV) {
    inject().then(() => {
    build({
        ...esbuildBase,
        entryPoints: ['src/dev/index.tsx'],
        outfile: 'public/build/bundle.js',
        loader: { '.svg': 'dataurl' },
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'public') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
    })
} else {
    inject().then(() => {
    prepare().then(() => {
        build({
            ...esbuildBase,
            format: 'esm',
            outfile: './dist/slidy.mjs',
        });

        build({
            ...esbuildBase,
            plugins: [],
            format: 'esm',
            jsx: 'preserve',
            outfile: './dist/slidy.jsx',
        });

        build({
            ...esbuildBase,
            format: 'iife',
            outfile: './dist/slidy.js',
            globalName: 'SlidySolid',
        });
    });
    })
}

import { createRequire } from 'node:module'
import { readFile, writeFile } from 'fs/promises'

/**
 * @todo: open an issue in @ryansolid/dom-expressions
 * 
 * 'transformCondition'
 * @see https://github.com/ryansolid/dom-expressions/blob/b3468dc9170b7b760b712f5d3f1bc7cd8653de1f/packages/babel-plugin-jsx-dom-expressions/src/shared/component.js#L165
 */
async function inject(target = 'babel-plugin-jsx-dom-expressions') {
    const Require = createRequire(import.meta.url);

    let entry = '';

    for (const id of Object.keys(Require.cache)) {
        if (!id) continue;

        const inc = id.includes.bind(id);

        if (inc(target) && inc('index.js')) {
            entry = id;
        }
    }

    if (!entry) throw new Error(`${target} entry was not found!!`);

    const source = await readFile(entry, 'utf-8');
    const data = source.replaceAll('transformCondition(', 'transformCondition$1(');

    await writeFile(entry, data, 'utf-8')

    console.log(`${target} was modified!!`)
}

