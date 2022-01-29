import { build } from 'esbuild';
import { derver } from 'derver'

const DEV = process.argv.includes('--dev');
const CORE = process.argv.includes('--core');
const base = {
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    entryPoints: ['src/slidy.ts']
}
if (DEV) {
    build({
        ...base,
        minify: false,
        outfile: 'dist/slidy.mjs',
        format: 'esm',
        incremental: true,
        watch: true
    }).then(bundle => {
        console.log('watching @slidy/core...')
    });
} else if (CORE) {
    build({
        ...base,
        minify: false,
        outfile: 'dev/dev.js',
        globalName: 'Slidy',
        format: 'iife',
        incremental: true
    }).then(bundle => {
        derver({
            dir: 'dev',
            index: 'dev.html',
            port: 3333,
            host: '0.0.0.0',
            watch: ['dev', 'src'],
            onwatch: async (lr, item) => {
                if (item === 'src') {
                    lr.prevent();
                    try {
                        await bundle.rebuild();
                    } catch (err) {
                        lr.error(err.message, 'TS compile Error');
                    }
                }
            }
        });
    });
} else {
    (async () => {
        await build({
            outfile: 'dist/slidy.cjs',
            format: 'cjs',
            ...base
        });
        await build({
            outfile: 'dist/slidy.mjs',
            format: 'esm',
            ...base
        })
        await build({
            outfile: 'dist/slidy.js',
            globalName: 'Slidy',
            format: 'iife',
            ...base
        });
        await build({
            outfile: 'dev/dev.js',
            globalName: 'Slidy',
            format: 'iife',
            ...base
        });
    })();
}
