import { build } from 'esbuild';
import { derver } from 'derver';
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const DEV = process.argv.includes('--dev');
const CORE = process.argv.includes('--core');

const esbuildBase = {
    watch: DEV,
    bundle: true,
    legalComments: 'none',
    minify: !DEV && !CORE,
    incremental: DEV || CORE,
    plugins: [eslintPlugin()],
    entryPoints: CORE
        ? ['@slidy/core', '@slidy/media', '@slidy/easing', '@slidy/animation']
        : ['src/index.ts'],
    outdir: CORE ? 'dev/build' : '',
    outfile: !CORE ? 'dist/index.mjs' : '',
    sourcemap: DEV || CORE ? 'inline' : false,
    globalName: 'Slidy',
    format: 'esm',
};

const derverConfig = {
    dir: 'dev',
    port: 3330,
    host: '0.0.0.0',
    watch: [
        'dev',
        'src',
        'node_modules/@slidy/media',
        'node_modules/@slidy/easing',
        'node_modules/@slidy/animation',
    ],
};
const builds = {
    cjs: {
        outfile: 'dist/index.cjs',
    },
    esm: {
        outfile: 'dist/index.mjs',
    },
    iife: {
        entryPoints: ['src/iife.ts'],
        outfile: 'dist/index.js',
    },
};

if (DEV || CORE) {
    build(esbuildBase)
        .then((bundle) => {
            if (DEV) console.log('watching @slidy/core...');
            else
                derver({
                    ...derverConfig,
                    onwatch: async (lr, item) => {
                        if (item !== 'dev') {
                            lr.prevent();
                            bundle
                                .rebuild()
                                .catch((err) => lr.error(err.message, 'TS compile error'));
                        }
                    },
                });
        })
        .catch(() => process.exit(1));
} else {
    for (const key in builds) {
        build({
            ...esbuildBase,
            ...builds[key],
            format: key,
        });
    }
}
