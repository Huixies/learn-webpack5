const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath:'http://localhost:9001/'

    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize:3000 //小于30kib 单独打包，否则会压缩到对应文件里去
        } 
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/env"],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                  }
                }
              }
        ]
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*',path.join(process.cwd(),'build/**/*')]
        }),
        new HtmlWebpackPlugin({
            title: 'ms-button',
            filename: 'ms-button.html',
            template: 'index.html',
            meta: {
                decription:'ms-button'
            },
            minify:false //不压缩
        }),
        new ModuleFederationPlugin({
            name: 'MsButtonApp',
            filename:'remoteEntry.js', //http://localhost:9001/remoteEntry.js
            exposes: {
                './MsButton':'./src/components/ms-button/ms-button.js'
            }
        })
       
    ]

}