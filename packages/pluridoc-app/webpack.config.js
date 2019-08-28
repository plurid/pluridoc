// import path from 'path';
const path = require('path');



module.exports = {
    entry: './src/components/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './src/client/')
    }
};
