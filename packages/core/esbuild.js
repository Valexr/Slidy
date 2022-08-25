import { build } from 'esbuild';
import { derver } from 'derver';
import { eslintPlugin } from 'esbuild-plugin-eslinter';
import prepare from '../../env/prepare.js';

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
    outdir: CORE ? 'public/build' : '',
    outfile: !CORE ? 'dist/index.mjs' : '',
    sourcemap: DEV || CORE ? 'inline' : false,
    format: 'esm',
};

const derverConfig = {
    dir: 'public',
    port: 3330,
    host: '0.0.0.0',
    watch: [
        'src',
        'public',
        'node_modules/@slidy/animation',
        'node_modules/@slidy/easing',
        'node_modules/@slidy/media',
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
        globalName: 'Slidy',
    },
};

if (DEV || CORE) {
    build(esbuildBase)
        .then((bundle) => {
            DEV
                ? console.log('watching @slidy/core...')
                : derver({
                      ...derverConfig,
                      onwatch: async (lr, item) => {
                          if (item !== 'public') {
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
    prepare().then(() => {
        for (const key in builds) {
            build({
                ...esbuildBase,
                ...builds[key],
                format: key,
            });
        }
    });
}
