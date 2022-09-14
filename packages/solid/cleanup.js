import FastGlob from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

const cwd = process.cwd();

/**
 * @param {string} line
 */
const filterer = (line) => {
    const inc = line.includes.bind(line);
    const match = inc('import') && inc('@slidy/assets') && inc('module.css');

    return !match;
};

export default async function main() {
    const files = await FastGlob(['dist/**/*.d.ts']);

    for (const file of files) {
        const filePath = path.resolve(cwd, file);

        const contents = await fs.readFile(filePath, 'utf8');

        const lines = contents.split('\n');

        const filtered = lines.filter(filterer).join('\n');

        if (contents !== filtered) {
            await fs.writeFile(filePath, filtered, 'utf8');
        }
    }
}

main();
