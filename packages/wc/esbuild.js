import { build } from 'esbuild';
import { derver } from 'derver';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    incremental: DEV,
    legalComments: 'none',
    plugins: [eslintPlugin()],
    entryPoints: ['src/index.ts'],
    sourcemap: DEV ? 'inline' : false,
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
        outfile: 'dev/dev.js'
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
            ...esbuildBase,
            outfile: 'dist/slidy.cjs',
            format: 'cjs',
        });
        await build({
            ...esbuildBase,
            outfile: 'dist/slidy.mjs',
            format: 'esm',
        });
        await build({
            ...esbuildBase,
            outfile: 'dist/slidy.js',
            globalName: 'Slidy',
            format: 'iife',
        });
    })();
}
