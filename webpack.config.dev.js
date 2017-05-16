const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv-safe').load();

const VENDOR_LIBS = [
  'axios', 'react', 'react-dom', 'react-redux',
  'react-router-redux', 'redux', 'redux-thunk',
];

module.exports = {
  devtool: 'eval',
  target: 'web',
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    vendor: VENDOR_LIBS
  },
  output: {
    path: join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: join(__dirname, './build'),
    port: 9000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://[::1]:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
};
