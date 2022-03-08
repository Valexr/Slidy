import { writeFileSync, promises, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { transform } from "esbuild";
import { preprocess } from "svelte/compiler";
import sveltePreprocess from "svelte-preprocess";

const esbuild = {
    loader: "ts",
    treeShaking: false,
    ignoreAnnotations: true,
    tsconfigRaw: `{
        "compilerOptions": {
          "useDefineForClassFields": true,
          "preserveValueImports":true
        },
    }`,
}

export default async function ({
    input = "./",
    output = "./dist/",
    ext = [""],
    exclude = [""],
    replace = [],
    remove = []
}) {
    const files = await getFiles(input, ext, exclude)

    for (const file of files) {
        const source = await promises.readFile(file.path);
        const dirpath = dirname(file.path).replace(input, output)
        const filepath = file.path.replace(input, output).replace(".ts", ".js");

        if (!existsSync(dirpath)) mkdirSync(dirpath);

        if (file.name.includes(".svelte")) {

            await preprocess(source.toString(), transformer, file.name).then(({ code }) => {

                replace.forEach(([search, replace]) => code = code.replace(search, replace))

                const match = remove.find(exc => code.includes(exc))
                const regex = new RegExp(`(import|export)(.*?)${match}(.*?);`, 'gi')
                const removed = code.replace(regex, '')

                const cleaned = removed.replace(/ lang="(scss|ts)"/g, "")
                    .replace("<script context=\"module\"></script>", '');

                writeFileSync(filepath, cleaned);
            });

        } else {
            let { code } = await transform(source.toString(), esbuild);

            replace.forEach(([search, replace]) => code = code.replace(search, replace))

            const match = remove.find(exc => code.includes(exc))
            const regex = new RegExp(`(import|export)(.*?)${match}(.*?);`, 'gi')
            const removed = code.replace(regex, '')

            writeFileSync(filepath, removed);
        }
    }
}

const transformer = [
    sveltePreprocess({
        typescript({ content }) {
            return transform(content, esbuild)
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