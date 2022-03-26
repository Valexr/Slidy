import { build } from 'esbuild';
import { derver } from 'derver';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    entryPoints: ['src/slidy.tsx'],
};
const derverConfig = {
    dir: 'dev/public',
    port: 3332,
    host: '0.0.0.0',
    watch: ['dev/public', 'dev/src/', 'src', '../core/dist'],
};

if (DEV) {
    build({
        entryPoints: ['dev/src/app.tsx'],
        outfile: 'dev/public/build/bundle.js',
        bundle: true,
        minify: false,
        sourcemap: 'inline',
        incremental: true,
        legalComments: 'none',
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev/public') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            outfile: "dist/slidy.cjs",
            format: 'cjs',
            ...esbuildBase,
        });
        await build({
            outfile: "dist/slidy.mjs",
            format: 'esm',
            ...esbuildBase,
        });
        await build({
            outfile: "dist/slidy.js",
            globalName: 'Slidy',
            format: 'iife',
            ...esbuildBase,
        });
    })();
}
