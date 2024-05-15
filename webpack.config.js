const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = (env, argv) => {
    return({
        entry: "./src/app.ts",
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "out.js"
        },
        devServer: {
            //https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/
            compress: true,
            port: 5556,
            host: "127.0.0.1"
        },
        performance: {hints: false},
        mode: 'development',
        resolve: {
            extensions: [".ts", ".js"],
            alias: {
                
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                minify: false
            }),

            new CopyPlugin({
                patterns: [{ from: "songs/"}]
            })
        ]
    })
}