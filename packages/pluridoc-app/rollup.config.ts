import resolve from 'rollup-plugin-node-resolve';
// import builtins from 'rollup-plugin-node-builtins';
// import globals from 'rollup-plugin-node-globals';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import image from 'rollup-plugin-img';
import copy from 'rollup-plugin-copy';



const pkg = require('./package.json');

const libraryName = 'pluridoc-app';

const globals = {
    'fs': 'fs',
    'path': 'path',
    'react': 'React',
    'react-dom/server': 'ReactDOM',
    'styled-components': 'styled',
    'slate': 'slate',
    'slate-react': 'slateReact',
    '@plurid/plurid-react': 'PluridApp',
    '@plurid/plurid-themes': 'pluridThemes',
};


export default {
    input: `source/index.ts`,
    output: [
        {
            file: pkg.main,
            name: camelCase(libraryName),
            format: 'umd',
            globals,
            sourcemap: true,
            exports: 'named',
        },
        {
            file: pkg.module,
            format: 'es',
            globals,
            sourcemap: true,
            exports: 'named',
        },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [
        'fs',
        'path',
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        json(),

        postcss({
            extensions: [ '.css' ],
        }),

        image({
            limit: 10000
        }),

        // Compile TypeScript files
        typescript({
            typescript: require('typescript'),
            objectHashIgnoreUnknownHack: true,
            useTsconfigDeclarationDir: true
        }),

        external({
            includeDependencies: true,
        }),

        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve({
            modulesOnly: true,
            preferBuiltins: true,
        }),

        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs({
            include: 'node_modules/**'
        }),

        // globals(),
        // builtins(),

        // Resolve source maps to the original source
        sourceMaps(),

        copy({
            targets: [
                { src: 'source/client/**/*', dest: 'distribution/client' },
            ],
        }),
    ],
}
