const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath:'http://localhost:9001/'
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,  //是否压缩
        port: 9001,
        open: true,  //自动打开
        hot:true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 'css-loader',
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*',path.join(process.cwd(),'build/**/*')]
        }),
        new HtmlWebpackPlugin({
            title: 'webpack5',
            meta: {
                decription:'webpack5'
            }
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