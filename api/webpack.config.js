const path = require("path");

module.exports = {
	entry: ["./src/index.ts"],
	target: "node",
	module: {
		rules: [
			{
				test: /.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	mode: "development",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: "index.js",
	},
};
