import { readFileSync, writeFileSync, readdir, promises, existsSync, mkdirSync } from 'fs';
import { build, transformSync } from 'esbuild';
import { preprocess } from 'svelte/compiler';
import { derver } from 'derver';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';
import cssmodules from './cssmodules.js';

const DEV = process.argv.includes('--dev');
const SVELTE = process.argv.includes('--svelte');

const svelteOptions = {
    compilerOptions: {
        dev: DEV || SVELTE,
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

const cssmodulesOptions = {
    transformClassName: ({ path, content, node }) => {
        // node - https://github.com/csstree/csstree/blob/bf05b963f85a08541c2991fa369f5bb613096db2/docs/ast.md
        // console.info({ path, content, node });
        return `${node.name}`;
    },
};

const esbuildBase = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    external: ['svelte', 'svelte/*'],
    // loader: {
    //     ['.css']: 'css'
    // },
    plugins: [sveltePlugin(svelteOptions), cssmodules(cssmodulesOptions)],
};

const derverConfig = {
    dir: 'dev/public',
    port: 3331,
    host: '0.0.0.0',
    watch: ['dev/public', 'dev/src/', 'src', '../core/dist'],
};

if (DEV) {
    build({
        ...esbuildBase,
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
        plugins: [sveltePlugin(svelteOptions), cssmodules(cssmodulesOptions)],
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev/public') {
                    lr.prevent();
                    bundle
                        .rebuild()
                        .catch((err) =>
                            lr.error(err.message, 'Svelte compile error')
                        );
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            ...esbuildBase,
            outfile: 'dist/slidy.cjs',
            format: 'cjs',
        });
        await build({
            ...esbuildBase,
            outfile: 'dist/slidy.mjs',
            format: 'esm',
        });
        await build({
            ...esbuildBase,
            outfile: 'dist/slidy.js',
            globalName: 'Slidy',
            format: 'iife',
        });

        getFiles('./src/', '.svelte').then(async files => {
            for (const file of files) {
                const source = readFileSync(file.path).toString();
                await preprocess(source, transpilator, file.name).then(
                    ({ code }) => {
                        const transpiled = code.replace(/ lang=\"(scss|ts)\"/g, '');
                        const path = file.path.replace('src', 'dist')
                        if (file.folder && !existsSync(`./dist/${file.folder}`)) {
                            mkdirSync(`./dist/${file.folder}`);
                        }
                        writeFileSync(path, transpiled);
                    }
                );
            }
        })
    })();
}

const transpilator = [
    sveltePreprocess({
        typescript({ content }) {
            const { code, map } = transformSync(content, {
                loader: 'ts',
                treeShaking: false,
                banner: `import { slidy } from "@slidy/core"`,
            });
            return { code, map };
        },
    }),
];

async function getFiles(path = "./", ext = '') {
    const entries = await promises.readdir(path, { withFileTypes: true });

    const files = entries
        .filter(file => !file.isDirectory() && file.name.includes(ext))
        .map(file => ({ ...file, path: path + file.name }));

    // Get folders within the current directory
    const folders = entries.filter(folder => folder.isDirectory());

    for (const folder of folders) {
        let filesInFolder = await getFiles(`${path}${folder.name}/`, ext).then(files => files.map(f => ({ ...f, folder: folder.name })))
        files.push(...filesInFolder)
    }

    return files;
}
