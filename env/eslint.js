import { promises as fs } from 'fs';
import { ESLint } from 'eslint';

export function eslint(persistLintIssues = true) {
    return {
        name: 'ESLint',
        async setup(build) {
            const linter = new ESLint();
            const formatter = await linter.loadFormatter();
            const cache = new Map();
            if (['info', 'debug', 'verbose'].includes(build.initialOptions.logLevel)) {
                console.log('Building initial ESLint cache...');
            }
            build.onLoad({ filter: /\.(jsx?|tsx?)$/ }, async ({ path }) => {
                const isNodeModule = /node_modules/.test(path);
                const input = isNodeModule ? 0 : await fs.readFile(path, 'utf8');
                let value = cache.get(path);

                if (!value || value.input !== input) {
                    const contents = isNodeModule ? [] : await linter.lintFiles(path);
                    const hasLintIssues = contents[0]?.messages?.length;
                    value = { input, output: { contents } };

                    if (!hasLintIssues || !persistLintIssues) {
                        cache.set(path, value);
                    }
                    if (hasLintIssues) {
                        return { warnings: [{ text: formatter.format(contents) }] };
                    }
                }
                return null;
            });
        },
    };
};