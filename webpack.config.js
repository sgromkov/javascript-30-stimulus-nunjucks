const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

function module_exists(name) {
    try { return require.resolve(name) }
    catch (e) { return false }
}

module.exports = env => {
    const data = (module_exists(`./src/${env.volume}/data.js`)) ? require(`./src/${env.volume}/data.js`) : {};

    return {
        entry: `./src/${env.volume}/index.js`,
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, `dist/${env.volume}`)
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            // contentBase: path.join(__dirname, `dist/${env.volume}`),
            contentBase: path.join(__dirname, 'dist'),
            // publicPath: '/1/',
            hot: true,
            port: 3000,
            open: true
        },
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|wav)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new NunjucksWebpackPlugin({
                templates: [
                    {
                        from: `./src/${env.volume}/index.njk`,
                        to: path.resolve(__dirname, `dist/${env.volume}/index.html`),
                        context: data,
                        writeToFileEmit: true
                    }
                ]
            }),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    };
};