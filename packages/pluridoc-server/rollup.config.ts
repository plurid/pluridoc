import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import copy from 'rollup-plugin-copy';

import camelCase from 'lodash.camelcase';



const pkg = require('./package.json');

const libraryName = 'pluridoc-server';

const outputGlobals = {
    'open': 'open',
    'socket.io': 'socket',
    'http': 'http',
    'fs': 'fs',
    'path': 'path',
    'portscanner': 'portscanner',
    'archiver': 'archiver',
    'crypto': 'crypto',
    '@plurid/pluridoc-parser': 'PluridocParser',
    '@plurid/pluridoc-app': 'PluridocApp',
};


export default {
    input: `source/index.ts`,
    output: [
        {
            file: `./distribution/${libraryName}.js`,
            format: 'cjs',
            globals: outputGlobals,
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            globals: outputGlobals,
            sourcemap: true,
        },
        {
            file: pkg.main,
            name: camelCase(libraryName),
            format: 'umd',
            globals: outputGlobals,
            sourcemap: true,
        },
    ],
    external: [
        'http',
        'path',
        'fs',
        'crypto',
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        json(),

        typescript({
            typescript: require('typescript'),
            objectHashIgnoreUnknownHack: true,
            useTsconfigDeclarationDir: true
        }),

        external({
            includeDependencies: true,
        }),

        globals(),
        builtins(),

        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve({
            preferBuiltins: true,
        }),

        commonjs(),

        sourceMaps(),

        copy({
            targets: [
                { src: 'source/assets/**/*', dest: 'distribution/assets' },
            ],
        }),
    ],
}
