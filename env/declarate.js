import { execSync } from 'child_process';

export default async function (options = { project: 'tsconfig.build.json', showConfig: true }) {
    options = Object.entries(options).reduce((acc, [key, value]) => {
        acc += `--${key} ${value} `;
        return acc;
    }, '');
    console.log(options);
    execSync(`tsc ${options}`);
}