const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config');

module.exports = merge(common, {
  entry: [
    '@babel/polyfill',
    path.join(__dirname, 'src', 'client', 'index.jsx'),
  ],
  devServer: {
    open: true,
    hot: true,
    proxy: [{
      context: ['/api'],
      target: 'http://localhost:443',
    }],
    port: 3000,
    historyApiFallback: {
      rewrites: [
        { from: /\/*$/, to: '/public/index.html' },
      ],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.html'),
    })
  ],
  devtool: 'source-map',
  mode: 'development',
});
