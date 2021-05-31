const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
    output: {
        filename: `script.js`,
        path: path.join(__dirname, 'worker'),
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
