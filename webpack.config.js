const path = require('path');
const glob = require('glob');
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

var entryObject = glob.sync('./src/**/index.js').reduce(
    function (entries, entry) {
        var matchForRename = /^\.\/src\/([\w\d_]+\/index)\.js$/g.exec(entry);
        var volume = `${matchForRename[1]}/`;

        if (matchForRename !== null && typeof matchForRename[1] !== 'undefined') {
            entries[matchForRename[1]] = entry;
        }

        return entries;
    },
    {}
);

var templateArray = glob.sync('./src/**/index.njk').reduce(
    function (templates, template) {
        var matchForRename = /^\.\/src\/([\w\d_])+\/index\.njk$/g.exec(template);

        if (matchForRename !== null && typeof matchForRename[1] !== 'undefined') {
            templates.push({
                from: `./src/${matchForRename[1]}/index.njk`,
                to: path.resolve(__dirname, `dist/${matchForRename[1]}/index.html`),
                context: (module_exists(`./src/${matchForRename[1]}/data.js`)) ? require(`./src/${matchForRename[1]}/data.js`) : {},
                writeToFileEmit: true
            });
        }

        return templates;
    },
    []
);

module.exports = env => {
    return {
        entry: entryObject,
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: 'development',
        devtool: 'inline-source-map',
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
                        {
                            loader: 'css-loader',
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|wav)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: 'src',
                                publicPath: '../'
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
                templates: templateArray
            }),
            new CleanWebpackPlugin(),
            // new webpack.HotModuleReplacementPlugin()
        ]
    };
};