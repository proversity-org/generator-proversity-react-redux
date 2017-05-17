'use strict';

const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, '/src');
const staticPath = path.join(__dirname, '/src/static');
const testPath = path.join(__dirname, '/test');

let config = {
  resolve: {
    extensions: ['.js', '.jsx' ],
    alias: {
      actions: path.join(srcPath, '/actions'),
      components: path.join(srcPath, '/components'),
      containers: path.join(srcPath, '/containers'),
      reducers: path.join(srcPath, '/reducers'),
      helpers: path.join(srcPath, '/helpers'),
      static: path.join(srcPath, '/static')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          }, 
          {
            loader: 'babel-loader',
            query: {
              plugins: ['lodash'],
              presets: ['env']
            }
          }, 
          {
            loader: 'eslint-loader'
          }
        ],
        include: [srcPath, testPath],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpeg|gif)(\?\S*)?$/,
        use: [
          'url-loader?limit=10000&name=[name].[ext]'
        ],
        include: [
          path.join(staticPath, '/images'),
          path.join(staticPath, '/font-awesome')
        ]
      },
      {
        test: /\.(mp4)$/,
        use: [
          'file-loader?name=static/video/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch'
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(staticPath, '/images/favicon.png'),
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true
      }
    })
  ]
}

module.exports = config;