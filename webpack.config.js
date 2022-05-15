const webpack = require(`webpack`);

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('dotenv').config({path: './.env'});

const {NODE_ENV = 'production'} = process.env;

module.exports = {
    entry: './src/server.ts',
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
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                    sourceMap: NODE_ENV === 'development',
                    uglifyOptions: {
                        mangle: false
                    }
                }
            )
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
    ]
}