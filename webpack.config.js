const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/faqs-datacake.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'faqs-datacake.js',
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      hash: true,
    }),
  ],
  // devServer: {
  //   devMiddleware: {
  //     writeToDisk: true,
  //   },
  // },
};
