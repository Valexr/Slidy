import { build } from 'esbuild';
import { derver } from 'derver';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: true,
    sourcemap: false,
    target: 'es2020',
    legalComments: 'none',
    plugins: [eslintPlugin()],
    entryPoints: ['src/slidy.ts'],
};
const derverConfig = {
    dir: 'dev',
    port: 3333,
    host: '0.0.0.0',
    watch: ['dev', 'src', 'node_modules/@slidy/core'],
};

if (DEV) {
    build({
        ...esbuildBase,
        minify: false,
        outdir: 'dev',
        globalName: 'Slidy',
        format: 'iife',
        sourcemap: 'inline',
        incremental: true,
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            outfile: './dist/slidy.cjs',
            format: 'cjs',
            ...esbuildBase,
        });
        await build({
            outfile: './dist/slidy.mjs',
            format: 'esm',
            ...esbuildBase,
        });
        await build({
            outfile: './dist/slidy.js',
            globalName: 'Slidy',
            format: 'iife',
            ...esbuildBase,
        });
        await build({
            outfile: 'dev/dev.js',
            globalName: 'Slidy',
            format: 'iife',
            ...esbuildBase,
        });
    })();
}
