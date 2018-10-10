const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	// Currently we need to add '.ts' to the resolve.extensions array.
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	// Source maps support ('inline-source-map' also works)
	devtool: 'source-map',

	// Add the loader for .ts files.
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	}
};
