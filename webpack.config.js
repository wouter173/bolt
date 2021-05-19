const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
    output: {
        filename: `worker.js`,
        path: path.join(__dirname, 'dist'),
    },
    mode,
    resolve: {
        extensions: ['.ts'],
        plugins: [],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
};
