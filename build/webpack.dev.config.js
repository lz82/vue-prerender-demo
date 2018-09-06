const baseConfig = require('./webpack.base.config.js');

const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');

const config = WebpackMerge(baseConfig, {
  mode: 'development',

  devServer: {
    contentBase: './dist',
    port: 9000,
    host: '127.0.0.1',
    overlay: {
      errors: true
    },
    hot: true,
    historyApiFallback: true
  },

  module: {
    rules: [
    {
      test: /\.css$/,
      use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader']
    }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin() // 开启HRM，热更新
  ]
});

module.exports = config;
