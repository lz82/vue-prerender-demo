const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const config = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'views': resolve('/src/views'),
      'less': resolve('/src/common/less'),
      'common': resolve('/src/common'),
      'router': resolve('/src/router'),
      'components': resolve('/src/components'),
      'pages': resolve('/src/pages')
    }
  },

  module: {
    rules: [
    {
      test: /\.(js|vue|jsx)$/,
      use: 'eslint-loader',
      exclude: [resolve('node_modules')],
      enforce: 'pre'
    },
    {
      test: /\.js$/,
      use: 'babel-loader',
      include: [resolve('src')],
      exclude: [resolve('node_modules')]
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.(jpg|png|jpeg|gif)$/,
      use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10,
          name: '[name].min.[ext]'
        }
      },
      'file-loader'
      ]
    }]
  },

  plugins: [
  new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
    root: path.resolve(__dirname, '../')
    }), // 清理打包目录

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),

    new VueLoaderPlugin(), // vue-loader 配套

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }) // html
    ]
  };

  module.exports = config;
