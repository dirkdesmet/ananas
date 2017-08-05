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
		new ExtractTextPlugin('./css/style.css')
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader!sass-loader'
			})
		}]
	},
	devServer: {
		contentBase: './dist',
		inline: true,
		open: true,
		openPage: ''
	}
};
