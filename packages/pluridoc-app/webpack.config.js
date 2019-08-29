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
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, './src/client/')
    }
};
