const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('./dist/css/style.css', {
            publicPath: '/css/',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [{
            test: /\.jpe?g$|\.png$|\.gif$/,
            loader: 'file-loader?name=/img/[name].[ext]'
        }, {
            test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
            loader: 'url-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
            })
        }, {
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports-loader?jQuery=jquery'
        }]
    },
    devServer: {
        contentBase: './dist',
        inline: true,
        open: true,
        openPage: '',
        // Uncomment & adapt IP below, if you want to debug on other devices in the same network
        // host: '192.168.1.115',
        port: 8080
    }
};
