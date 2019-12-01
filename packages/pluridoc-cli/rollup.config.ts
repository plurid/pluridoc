import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';



const pkg = require('./package.json');

const libraryName = 'pluridoc-cli';

const outputGlobals = {
    'events': 'events',
    'child_process': 'child_process',
    'path': 'path',
    'fs': 'fs',
    'util': 'util',
    '@plurid/pluridoc-server': 'PluridocServer',
};


export default {
    input: 'source/index.ts',
    output: [
        {
            file: pkg.main,
            name: camelCase(libraryName),
            format: 'umd',
            globals: outputGlobals,
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            globals: outputGlobals,
            sourcemap: true,
        },
    ],
    external: [
        'events',
        'path',
        'fs',
        'util',
        'child_process',
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        json(),

        typescript({
            useTsconfigDeclarationDir: true
        }),

        external({
            includeDependencies: true,
        }),

        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve({
            preferBuiltins: true,
        }),

        commonjs(),

        globals(),
        builtins(),

        sourceMaps(),
    ],
}
