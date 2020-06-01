const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const configs = {
    entry: './src/app.ts',
    output: {
        filename: 'custom.js',
        path: path.resolve(__dirname, 'bundle')
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : 'none',
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /.tsx?$/,
                use: {
                    loader: 'ts-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1024,
                        outputPath: 'imgs'
                    }
                }],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
        })
    ],
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用,启用后看不到error log
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用,启用后会全屏输出错误
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    }
}

module.exports = configs;