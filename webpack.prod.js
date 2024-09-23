const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require('copy-webpack-plugin')
module.exports = (env, args) => {
    return merge(webpackCommon(env, args), {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,

                            },
                        },

                    ],
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
            new CopyPlugin({
                patterns: [
                    { from: './server/server.js', to: '' },
                    { from: './server/package.json', to: '' }
                ]
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
            splitChunks: {
                chunks: 'all',
            },
        },
        cache: {
            type: "filesystem"
        },

    })
}