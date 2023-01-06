const path = require("path")                            //nodejs 核心模块
const { VueLoaderPlugin } = require('vue-loader')         //处理.vue文件
const ESLintPlugin = require("eslint-webpack-plugin")   //处理js文件 eslint
const HtmlWebpackPlugin = require("html-webpack-plugin")//处理html资源

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // 所有文件输出路径
        path: path.resolve(__dirname, "../dist"),
        // 输出文件名
        filename: "static/js/main.js",
        // 自动清空上次打包内容
        clean: true
    },
    // 加载器
    module: {
        rules: [
            // vue-loader
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 处理普通 .js 文件 和 .vue中 script 块
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"), //只处理 src下的 js文件
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,   //开启babel缓存
                            cacheCompression: false //关闭缓存文件压缩
                        }
                    }
                ]
            },
            // 处理普通的 .css文件 和 .vue中的 style 块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader', 
                    'css-loader', 
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                // postcss-preset-env 能解决大多数样式兼容性问题
                                plugins:["postcss-preset-env"]
                            }
                        }
                    }
                ]
            },
            // 处理 图片资源 和 其他资源（音视频）
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                generator: {
                    // 输出的图片名称
                    filename: "static/images/[hash][ext][query]"
                },
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        maxSize: 10 * 1024 //10kb
                    }
                }
            }
        ]
    },
    // 插件
    plugins: [
        // 必需
        new VueLoaderPlugin(),
        // eslint
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src")
        }),
        // html
        new HtmlWebpackPlugin(
            { template: path.resolve(__dirname, "../public/index.html") }
        )
    ],
    // 模式
    mode: "production",
    devtool: "source-map",
    // webpack解析模块加载选项
    resolve: {
        // 以下配置会将没指定拓展名的文件按如下类型查找匹配
        extensions: [".vue", ".js", ".json"],
        // 设置别名
        alias: {
            "@": path.resolve(__dirname, "../src"), // 这样配置后 @ 可以指向 src 目录
        },
    }
}