import { readFile, writeFile } from 'fs/promises';

export default function html(options = {}) {
    return {
        name: 'html',
        setup(build) {
            build.onEnd(async (result) => {
                let html = await readFile(options.in);

                html = html.toString();

                if (options.dev) {
                    const linkedReplace = `\t<link rel='stylesheet' href='build/bundle.css'>\n\t<script defer src='build/bundle.js'></script>\n</head>`;
                    html = html.replace('</head>', linkedReplace);
                } else {
                    let [js, css] = result.outputFiles;

                    html = html
                        .replace('</head>', () => `<style>\n${css.text}</style>\n</head>`)
                        .replace('</body>', () => `<script>\n${js.text}</script>\n</body>`);
                }

                await writeFile(options.out, html, { encoding: 'utf8' });
            });
        },
    };
}