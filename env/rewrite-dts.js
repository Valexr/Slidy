import fs from 'fs/promises';
import path from 'path';

const cwd = process.cwd();
const re = /declare module "(.*?)"/g;

export default async function main() {
    const paths = {
        'dts': path.resolve(cwd, 'dist', 'index.d.ts'),
        'package.json': path.resolve(cwd, 'package.json')
    }

    let content = await fs.readFile(paths['dts'], 'utf-8');

    const declarations = content.match(re);

    if (declarations === null) throw new Error(`No found declarations at ${paths['dts']}`);

    const latest = declarations.at(-1);

    const packageJson = await fs.readFile(paths['package.json'], 'utf-8');
    const json = JSON.parse(packageJson);

    content = content.replace(latest.slice(16, -1), String(json.name));

    await fs.writeFile(paths['dts'], content, 'utf-8')
}

main();
