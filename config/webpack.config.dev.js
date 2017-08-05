const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
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
		})
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
