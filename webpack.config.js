const webpack = require(`webpack`);

const path = require('path');
const nodeExternals = require('webpack-node-externals');

require('dotenv').config({path: './.env'});

const {NODE_ENV = 'production'} = process.env;

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    watch: NODE_ENV === 'development',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
    ]
}