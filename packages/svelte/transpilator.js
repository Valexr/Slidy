import { constants } from "fs";
import { access, mkdir, readdir, readFile, writeFile } from "fs/promises";
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
};

const transformer = [
	sveltePreprocess({
		typescript({ content }) {
			return transform(content, esbuild);
		},
	}),
];

export default async function ({
	input = "./",
	output = "./dist/",
	ext = [""],
	exclude = [""],
	replace = [],
	remove = []
}) {
	const files = await getFiles(input, ext, exclude);

	for (const file of files) {
		const source = await readFile(file.path);
		const dirpath = dirname(file.path).replace(input, output);
		const filepath = file.path.replace(input, output).replace(".ts", ".js");

		try {
			await access(dirpath, constants.R_OK | constants.W_OK);
		} catch {
			mkdir(dirpath);
		}

		let { code } = file.name.includes(".svelte")
			? await preprocess(source.toString(), transformer, file.name)
			: await transform(source.toString(), esbuild);

		code = replacer(code, replace);
		code = remover(code, remove);

		writeFile(filepath, code);
	}
}

function replacer(code, replace) {
	return replace.reduce((acc, [search, replace]) => {
		const regex = new RegExp(search, "g");
		acc = code.replace(regex, replace);
		return acc;
	}, '');
}

function remover(code, remove) {
	const match = remove.find((exc) => code.includes(exc));
	const regex = new RegExp(`(import|export)(.*?)${match}(.*?);`, "gi");
	return code.replace(regex, "").replace(/ lang="(scss|ts)"/g, "").replace('<script context="module"></script>', "");
}

async function getFiles(input = "./", ext = [""], exclude = [""]) {
	const entries = await readdir(input, { withFileTypes: true });

	const files = entries
		.filter((file) => {
			const filepath = input + file.name;
			const isDirectory = file.isDirectory();
			const hasExt = ext.some((ext) => file.name.includes(ext));
			const hasExc = exclude.some((exc) => filepath.includes(exc));
			return !isDirectory && hasExt && !hasExc;
		})
		.map((file) => ({ ...file, path: input + file.name }));

	const folders = entries.filter((folder) => folder.isDirectory());

	for (const folder of folders) {
		let filesInFolder = await getFiles(`${input}${folder.name}/`, ext, exclude).then((files) => files.map((f) => ({ ...f, folder: folder.name })));
		files.push(...filesInFolder);
	}

	return files;
}
