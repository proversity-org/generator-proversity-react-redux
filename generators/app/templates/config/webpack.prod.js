
'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const distPath = path.join(__dirname, '/dist');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const VENDOR_LIBS = [
  
];

let config = Object.assign(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: ['./src/index.js'],
    vendor: VENDOR_LIBS
  },
  output: {
    path: distPath,
    filename: '[name].[chunkhash].js'
  }
});

const prodPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: 2
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new SWPrecacheWebpackPlugin(
    {
      cacheId: '<%= cacheName %>Cache',
      filename: '<%= cacheName %>-cache-worker.js',
      maximumFileSizeToCacheInBytes: 4194304,
      minify: true,
      staticFileGlobsIgnorePatterns: [/dist\/.*\.html/]
    }
  ),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    'BASE_URL': 'http://localhost:3001',
    'SESSION_KEY': '"<%= sessionKey %>"'
  })
]

prodPlugins.map((plugin) => {
  config.plugins.push(plugin)
})

module.exports = config;