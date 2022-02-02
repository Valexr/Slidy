import { readFileSync, writeFileSync } from 'fs';
import { build, transformSync } from 'esbuild';
import { preprocess } from 'svelte/compiler';
import { derver } from 'derver';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';

const pkg = JSON.parse(
    readFileSync(new URL('package.json', import.meta.url), 'utf8')
);
// console.log(pkg);

const DEV = process.argv.includes('--dev');
const SVELTE = process.argv.includes('--svelte');

const svelteOptions = {
    compilerOptions: {
        dev: DEV,
        css: !SVELTE,
        immutable: true,
    },
    preprocess: [
        sveltePreprocess({
            sourceMap: DEV || SVELTE,
            typescript: true,
        }),
    ],
};
const esbuidBase = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    external: ['svelte', 'svelte/*'],
    plugins: [sveltePlugin(svelteOptions)],
};
const derverConfig = {
    dir: 'dev/public',
    port: 3331,
    host: '0.0.0.0',
    watch: ['dev/public', 'dev/src/', 'src', '../core/dist'],
};

if (DEV) {
    build({
        ...esbuidBase,
        outfile: 'dist/slidy.mjs',
        format: 'esm',
        sourcemap: 'inline',
        minify: false,
        incremental: true,
        watch: true,
    }).then((bundle) => {
        console.log('watching @slidy/svelte...');
    });
} else if (SVELTE) {
    build({
        entryPoints: ['dev/src/main.ts'],
        outfile: 'dev/public/build/bundle.js',
        platform: 'browser',
        bundle: true,
        sourcemap: 'inline',
        incremental: true,
        legalComments: 'none',
        plugins: [sveltePlugin(svelteOptions)],
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev/public') {
                    lr.prevent();
                    bundle.rebuild().catch(err => lr.error(err.message, 'Svelte compile error'));
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            ...esbuidBase,
            outfile: 'dist/slidy.cjs',
            format: 'cjs',
        });
        await build({
            ...esbuidBase,
            outfile: 'dist/slidy.mjs',
            format: 'esm',
        });
        await build({
            ...esbuidBase,
            outfile: 'dist/slidy.js',
            globalName: 'Slidy',
            format: 'iife',
        });
        await preprocess(source, transpilator, 'Slidy.svelte').then(
            ({ code }) => {
                const transpiled = code.replace(/ lang=\"(scss|ts)\"/g, '');
                writeFileSync('./dist/Slidy.svelte', transpiled);
            }
        );
    })();
}

const source = readFileSync('./src/Slidy.svelte').toString();

const transpilator = [
    sveltePreprocess({
        typescript({ content }) {
            const { code, map } = transformSync(content, {
                loader: 'ts',
                banner: `import { slidy } from "@slidy/core"`,
            });
            return { code, map };
        },
    }),
];
