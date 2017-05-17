'use strict';

const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const distPath = path.join(__dirname, '/dist');
const srcPath = path.join(__dirname, '/src');
const port = 3000;

const VENDOR_LIBS = [
  
];

let config = Object.assign(baseConfig, {
  devtool: 'eval',
  entry: {
    bundle: [
      'webpack-dev-server/client?http://0.0.0.0:' + port,
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    vendor: VENDOR_LIBS
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  devServer: {
    port: port,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: { colors: true, progress: true },
    contentBase: srcPath,
    hot:true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  }
});

const devPlugins = [
  new WebpackBrowserPlugin({
    browser: 'Chrome',
    port: port
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    },
    'BASE_URL': 'http://localhost:3001',
    'SESSION_KEY': '"<%= sessionKey %>"'
  })
]

devPlugins.map((plugin) => {
  config.plugins.push(plugin)
})

module.exports = config;