const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin'); 

let config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'output.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], //auto resolved certain extensions
		alias: {
			images: path.resolve(__dirname, 'src/assets/images')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.scss$/,
				use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader', // fallback for any CSS not extracted
					use: ['css-loader', 'sass-loader', 'postcss-loader'],
				})),
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader', // use the babel-loader for all .jsx files
				exclude: /node_modules/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
					loader: 'image-webpack-loader',
					query: {
						mozjpeg: {
							progressive: true,
						},
						gifsicle: {
							interlaced: false,
						},
						optipng: {
							optimizationLevel: 4,
						},
						pngquant: {
							quality: '75-90',
							speed: 3,
						},
					},
				}],
				exclude: /node_modules/,
				include: __dirname,
			},
		]
	},
	plugins: [
		new ExtractTextWebpackPlugin('styles.css')
	],
	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		historyApiFallback: true, // index.html for single page applications.
		inline: true,
		open: true,
		openPage: ''
	},
	devtool: 'eval-source-map' // enable devtool
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  );
}

module.exports = config;
