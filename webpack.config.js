const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonComponentsResources = [{
  from: path.join(__dirname, 'src', 'api'),
  to: path.join(__dirname, 'dist'),
}];

const clientPath = path.join(__dirname, 'src', 'client');
const publicPath = '/public/';

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.sass'],
    alias: {
      api: `${clientPath}/api`,
      containers: `${clientPath}/containers/`,
      components: `${clientPath}/components/`,
      constants: `${clientPath}/constants/`,
      images: `${clientPath}/images/`,
      actions: `${clientPath}/store/actions/`,
      reducers: `${clientPath}/store/reducers/`,
      sagas: `${clientPath}/store/sagas/`,
      styles: `${clientPath}/styles/`,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      }, {
        test: /\.(css)$/,
        use: [{
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        }, 'css-loader'],
      }, {
        test: /\.(scss)$/,
        use: [{
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        }, 'css-loader', 'sass-loader'],
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          quality: 85,
          limit: 10 * 1024,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(commonComponentsResources, {
      copyUnmodified: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
