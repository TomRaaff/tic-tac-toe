const path = require('path');

console.log('PATH:::', path.resolve(__dirname, 'dist'));
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	watch: true,
	// Babel ES6 loader
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
}


// devServer: {
//  contentBase: [path.join(__dirname), path.join(__dirname, 'dist')],
// 	port: 3000,
// 	index: 'index.html',
// 	overlay: true
// 	mimeTypes: {
// 		'text/html': ['phtml'],
// 			'text/javascript': ['**.js']
// 	}
// }
