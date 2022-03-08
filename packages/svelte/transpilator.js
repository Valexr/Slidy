import { writeFileSync, promises, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { transform } from "esbuild";
import { preprocess } from "svelte/compiler";
import sveltePreprocess from "svelte-preprocess";

const transformOptions = {
    loader: "ts",
    treeShaking: false,
    ignoreAnnotations: true,
}

export default async function ({ input = "./", ext = [""], exclude = [""], output = "./dist/" }) {
    const files = await getFiles(input, ext, exclude)

    for (const file of files) {
        const source = await promises.readFile(file.path);
        const dirpath = dirname(file.path).replace(input, output)
        const filepath = file.path.replace(input, output).replace(".ts", ".js");

        if (!existsSync(dirpath)) mkdirSync(dirpath);

        if (file.name.includes(".svelte")) {

            await preprocess(source.toString(), transformer, file.name).then(({ code }) => {
                const matched = code.match(/import ("|')(.*?).css("|');/gi)[0];
                const replaced = matched.includes("slidy.")
                    ? code.replace("./slidy.module.css", "../slidy.css")
                    : code.replace(matched, "");

                let transpiled = replaced.replace(/ lang="(scss|ts)"/g, "");

                const search = "<script context=\"module\"></script>";
                const replace = "<script context=\"module\">import { slidy } from \"@slidy/core\"; import { Arrow, Image, Pagination } from \"./components\";</script>";

                transpiled = transpiled.replace(search, file.name === "Slidy.svelte" ? replace : '')

                writeFileSync(filepath, transpiled);
            });

        } else {
            const { code } = await transform(source.toString(), transformOptions);

            const match = exclude.find(exc => code.includes(exc))
            const regex = new RegExp(`(.*?)${match}(.*?);`, 'gi')
            const replaced = code.replace(regex, '')

            writeFileSync(filepath, replaced);
        }
    }
}

const transformer = [
    sveltePreprocess({
        typescript({ content }) {
            return transform(content, transformOptions);
        },
    }),
];

async function getFiles(input = "./", ext = [""], exclude = [""]) {

    const entries = await promises.readdir(input, { withFileTypes: true });

    const files = entries
        .filter((file) => {
            const filepath = input + file.name
            const isDirectory = file.isDirectory()
            const hasExt = ext.some(ext => file.name.includes(ext))
            const hasExc = exclude.some(exc => filepath.includes(exc))
            return !isDirectory && hasExt && !hasExc
        })
        .map((file) => ({ ...file, path: input + file.name }));

    const folders = entries.filter((folder) => folder.isDirectory());

    for (const folder of folders) {
        let filesInFolder = await getFiles(`${input}${folder.name}/`, ext, exclude).then((files) =>
            files.map(f => ({ ...f, folder: folder.name })));
        files.push(...filesInFolder);
    }

    return files;
}