import { readFileSync, writeFileSync, promises, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { transformSync } from "esbuild";
import { preprocess } from "svelte/compiler";
import sveltePreprocess from "svelte-preprocess";

export default async function ({ root = "./", ext = [""], exclude = ["dev"] }) {
    const files = await getFiles(root, ext, exclude)

    for (const file of files) {
        const source = readFileSync(file.path).toString();
        const dirpath = dirname(file.path).replace("src", "dist")
        const filepath = file.path.replace("src", "dist").replace(".ts", ".js");

        if (!existsSync(dirpath)) mkdirSync(dirpath);

        if (file.name.includes(".ts") && !file.name.includes("types.ts")) {

            const { code } = transformer(source);
            writeFileSync(filepath, code);

        } else if (file.name.includes(".svelte")) {

            await preprocess(source, transpilator, file.name).then(({ code }) => {
                const matched = code.match(/import ("|')(.*?).css("|');/gi)[0];
                const replaced = matched.includes("slidy.")
                    ? code.replace("./slidy.module.css", "../slidy.css")
                    : code.replace(matched, "");

                let transpiled = replaced.replace(/ lang="(scss|ts)"/g, "");

                const searchValue = "<script context=\"module\"></script>";
                const replaceValue = "<script context=\"module\">import { slidy } from \"@slidy/core\"; import { Arrow, Image, Pagination } from \"./components\";</script>";

                transpiled = file.name === "Slidy.svelte"
                    ? transpiled.replace(searchValue, replaceValue)
                    : transpiled;

                writeFileSync(filepath, transpiled);
            });

        }
    }
}

const transpilator = [
    sveltePreprocess({
        typescript({ content }) {
            return transformer(content);
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

async function getFiles(root = "./", ext = [""], exclude = ["dev"]) {
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