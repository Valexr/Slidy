import { readFile } from 'node:fs/promises';
import { sep } from 'node:path';
import { transform } from '@dom-expressions/compiler';
import { build, context } from 'esbuild';
import prepare from '../../env/prepare.js';

const DEV = process.argv.includes('--dev');

const SOLID_BUILTINS = [
    'For',
    'Show',
    'Switch',
    'Match',
    'Loading',
    'Reveal',
    'Portal',
    'Repeat',
    'Dynamic',
    'Errored',
];

/**
 * @param {{ dev?: boolean }} [options]
 * @returns {import('esbuild').Plugin}
 */
function solidOxc({ dev = false } = {}) {
    return {
        name: 'solid-oxc',
        setup(api) {
            api.onLoad({ filter: /\.[jt]sx$/ }, async (args) => {
                if (args.path.includes(`${sep}node_modules${sep}`)) return;

                const source = await readFile(args.path, 'utf8');
                const result = transform(source, {
                    filename: args.path,
                    sourceMap: true,
                    moduleName: '@solidjs/web',
                    generate: 'dom',
                    hydratable: false,
                    builtIns: SOLID_BUILTINS,
                    contextToCustomElements: true,
                    wrapConditionals: true,
                    omitNestedClosingTags: true,
                    dev,
                });

                const map =
                    typeof result.map === 'string'
                        ? result.map
                        : result.map
                          ? JSON.stringify(result.map)
                          : null;

                return {
                    contents: map
                        ? `${result.code}\n//# sourceMappingURL=data:application/json;base64,${Buffer.from(map).toString('base64')}`
                        : result.code,
                    loader: 'ts',
                    watchFiles: [args.path],
                };
            });
        },
    };
}

/** @type { import('esbuild').BuildOptions } */
const esbuildBase = {
    bundle: true,
    minify: !DEV,
    plugins: [solidOxc({ dev: DEV })],
    entryPoints: ['src/index.tsx'],
    sourcemap: DEV ? 'inline' : false,
    external: DEV ? [] : ['solid-js', '@solidjs/web'],
    legalComments: 'none',
    logLevel: 'info',
};

const builds = {
    esm: {
        format: 'esm',
        outfile: './dist/slidy.mjs',
    },
    jsx: {
        plugins: [],
        format: 'esm',
        jsx: 'preserve',
        outfile: './dist/slidy.jsx',
    },
    iife: {
        format: 'iife',
        outfile: './dist/slidy.js',
        globalName: 'SlidySolid',
    },
};

if (DEV) {
    const ctx = await context({
        ...esbuildBase,
        minify: false,
        entryPoints: ['src/dev/index.tsx'],
        outfile: 'public/build/bundle.js',
        loader: {
            '.svg': 'dataurl',
            '.css': 'global-css',
            '.module.css': 'global-css',
        },
    });

    await ctx.watch();
    await ctx.serve({ servedir: 'public', port: 3334 });
} else {
    await prepare();

    for (const key in builds) {
        await build({
            ...esbuildBase,
            ...builds[key],
            loader: {
                '.svg': 'dataurl',
                '.css': 'global-css',
                '.module.css': 'global-css',
            },
        });
    }
}
