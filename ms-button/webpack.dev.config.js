const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath:''
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,  //是否压缩
        port: 9000,
        open: true,  //自动打开
        hot:true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader',
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
        })
    ]

}