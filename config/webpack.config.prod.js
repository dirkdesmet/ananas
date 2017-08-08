const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, '../dist'),
		filename: './js/bundle.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
		// If we don't put the CSS in the root, background image url paths are
		// translated wrong by webpack (file-loader). useRelativePath solves
		// this issue, BUT in that case webpack copies those image files outside
		// the dist folder... :( Both situations result in broken images.
        // new ExtractTextPlugin('css/[name].css', {
        new ExtractTextPlugin('[name].css', {
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
			loader: 'file-loader',
			options: {
				name: 'img/[name].[ext]',
				publicPath: './',
				// useRelativePath: true,
			}
		},{
            test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
            loader: 'url-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!resolve-url-loader!sass-loader'
            })
        }, {
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports-loader?jQuery=jquery'
        }]
	}
};
