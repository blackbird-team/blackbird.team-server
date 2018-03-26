const fs = require("fs");
const path = require("path");

const nodeModules = {};
fs
	.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`;
	});

const loaders = {
	js: (isBackEnd = false) => ({
		test: /\.tsx?$/,
		exclude: isBackEnd ? /\/node_modules\// : [],
		use: ["babel-loader", "ts-loader"]
	}),
	json: {
		test: /\.json$/,
		use: "json-loader"
	}
};

module.exports ={
	target: "node",
	mode: "production",
	externals: nodeModules,
	entry: [`${__dirname}/source/ts/index.ts`],
	resolve: {
		extensions: [ '.ts', '.js' ]
	},
	output: {
		path: `${__dirname}/build/`,
		filename: `index.min.js`
	},
	module: {
		rules: [loaders.js(true), loaders.json]
	}
};
