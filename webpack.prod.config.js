/*	eslint import/no-extraneous-dependencies:0	*/
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");

const nodeModules = {};
fs
	.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`;
	});

module.exports = {
	target: "node",
	devtool: "source-map",
	externals: nodeModules,
	context: `${__dirname}/source/js/`,
	entry: [`${__dirname}/source/js/index.js`],
	output: {
		path: `${__dirname}/build/`,
		filename: "main.min.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /\/node_modules\//,
				use: "babel-loader"
			},
			{
				test: /\.json$/,
				use: "json-loader"
			}
		]
	},
	plugins: [new CleanWebpackPlugin([`${__dirname}/build/`]), new MinifyPlugin()]
};
