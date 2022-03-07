import { readFileSync, writeFileSync, promises, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { build, transformSync } from "esbuild";
import { preprocess } from "svelte/compiler";
import { derver } from "derver";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import cssmodules from "./css-modules.js";

const DEV = process.argv.includes("--dev");
const SVELTE = process.argv.includes("--svelte");

const svelteOptions = {
    compilerOptions: {
        dev: DEV || SVELTE,
        css: !SVELTE,
        immutable: true
    },
    preprocess: [
        sveltePreprocess({
            sourceMap: DEV || SVELTE,
            typescript: true
        })
    ]
};

const cssModulesOptions = {
    transformClassName: ({ path, content, node }) => {
        // node - https://github.com/csstree/csstree/blob/bf05b963f85a08541c2991fa369f5bb613096db2/docs/ast.md
        return `${node.name}`;
    }
};

const esbuildBase = {
    entryPoints: ["src/component/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: "none",
    external: [
        "svelte",
        "svelte/*"
    ],
    plugins: [
        sveltePlugin(svelteOptions),
        cssmodules(cssModulesOptions)
    ]
};

const derverConfig = {
    dir: "public",
    port: 3331,
    host: "0.0.0.0",
    watch: [
        "public",
        "src",
        "dist"
    ]
};

if (DEV) {
    build({
        ...esbuildBase,
        outfile: "./dist/slidy.mjs",
        format: "esm",
        sourcemap: "inline",
        minify: false,
        incremental: true,
        watch: true,
    }).then((bundle) => {
        console.log("Watching @slidy/svelte...");
    });
} else if (SVELTE) {
    build({
        entryPoints: ["src/dev/main.ts"],
        outfile: "public/build/bundle.js",
        platform: "browser",
        bundle: true,
        sourcemap: "inline",
        incremental: true,
        legalComments: "none",
        plugins: [
            sveltePlugin(svelteOptions),
            cssmodules(cssModulesOptions)
        ],
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== "public") {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, "Svelte compile error"));
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            ...esbuildBase,
            outfile: "dist/slidy.cjs",
            format: "cjs",
        });
        await build({
            ...esbuildBase,
            outfile: "dist/slidy.mjs",
            format: "esm",
        });
        await build({
            ...esbuildBase,
            outfile: "dist/slidy.js",
            globalName: "slidy",
            format: "iife",
        });

        getFiles("./src/", [".svelte", ".ts"]).then(async (files) => {

            for (const file of files) {
                const source = readFileSync(file.path).toString();
                const dirpath = dirname(file.path).replace("src", "dist")
                const filepath = file.path.replace("src", "dist").replace('.ts', '.js');

                if (!existsSync(dirpath)) mkdirSync(dirpath)

                if (file.name.includes('.ts') && !file.name.includes('types.ts')) {

                    const { code } = transformer(source)
                    writeFileSync(filepath, code);

                } else if (file.name.includes('.svelte')) {

                    await preprocess(source, transpilator, file.name).then(({ code }) => {
                        const replaced = code.split(/\n/).map(s => {
                            if (s.includes('module.css'))
                                return s.includes('slidy.')
                                    ? s.replace('./slidy.module.css', '../slidy.css')
                                    : s.includes('<script') ? s.replace(s, '<script lang="ts">') : s.replace(s, '')
                            else return s
                        }).join('\n')

                        let transpiled = replaced.replace(/ lang=\"(scss|ts)\"/g, "")

                        const searchValue = `<script context="module"></script>`;
                        const replaceValue = `<script context="module">import { slidy } from "@slidy/core"; import { Arrow, Image, Pagination } from "./components";</script>`;

                        transpiled = file.name === "Slidy.svelte"
                            ? transpiled.replace(searchValue, replaceValue)
                            : transpiled;

                        writeFileSync(filepath, transpiled);
                    });

                }
            }
        });
    })();
}

const transpilator = [
    sveltePreprocess({
        typescript({ content }) {
            return transformer(content)
        },
    }),
];

const transformer = (content) => {
    const { code, map } = transformSync(content, {
        loader: "ts",
        treeShaking: false,
        ignoreAnnotations: true,
    });
    return { code, map };
}

async function getFiles(root = "./", ext = [""], exclude = ["dev", "images-api.ts"]) {
    const entries = await promises.readdir(root, { withFileTypes: true });

    const files = entries
        .filter((file) => !file.isDirectory() && ext.some(ext => file.name.includes(ext)) && exclude.every(exc => !(root + file.name).includes(exc)))
        .map((file) => ({ ...file, path: root + file.name }));

    const folders = entries.filter((folder) => folder.isDirectory());

    for (const folder of folders) {
        let filesInFolder = await getFiles(`${root}${folder.name}/`, ext).then((files) =>
            files.map(f => ({ ...f, folder: folder.name })));
        files.push(...filesInFolder);
    }

    return files;
}
