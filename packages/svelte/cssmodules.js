import * as Path from 'path';
import * as csstree from 'css-tree';
import { readFile, readFileSync } from 'fs';

/**
 * @param options - an object like `Options` (explained below)
 *
 * ```typescript
 * type Options = {
 *   transformClassName?: (args: {path: string, content: string}) => string
 * }
 * ```
 *
 */
export default (options = {}) => ({
    name: 'simple-css-modules',
    async setup(build) {
        const transform = async (path) => {
            const content = readFileSync(path).toString();
            const ast = csstree.parse(content);
            const styles = {};

            const namespace = Path.relative(process.cwd(), path)
                .replace(/\//g, '__')
                .replace(/\./g, '_');

            const transformClassName = (node) =>
                options.transformClassName?.({ path, content, node }) ??
                ((node) => `${node.name}`);

            csstree.walk(ast, {
                visit: 'ClassSelector',
                enter(node) {
                    styles[node.name] = transformClassName(node);
                    node.name = styles[node.name];
                },
            });

            const css = csstree.generate(ast);

            return {
                namespace,
                styles,
                css,
            };
        };

        const cssContents = new Map();

        build.onLoad({ filter: /\.module.css/ }, async (args) => {
            const { css, styles, namespace } = await transform(args.path);

            const importPath = `css-module://${namespace}`;

            cssContents.set(importPath, css);

            return {
                contents: `
                import "${importPath}"; 
                export default ${JSON.stringify(styles)}
                `,
            };
        });

        build.onResolve({ filter: /^css-module:\/\// }, (args) => ({
            path: args.path,
            namespace: 'css-module',
        }));

        build.onLoad({ filter: /.*/, namespace: 'css-module' }, (args) => {
            const css = cssContents.get(args.path);

            return { contents: css, loader: 'css' };
        });
    },
});
