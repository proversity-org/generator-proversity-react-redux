'use strict';

const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const distPath = path.join(__dirname, '/dist');
const srcPath = path.join(__dirname, '/src');
const port = 3000;

const VENDOR_LIBS = [
  'chart.js', 'classnames', 'isomorphic-fetch', 'moment', 'react', 'react-async-component',
  'react-bootstrap', 'react-chartjs-2', 'react-dom', 'react-dropzone',
  'react-redux', 'react-router', 'react-router-redux', 'redux', 'redux-thunk',
  'socket.io-client', 'lodash'
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
    'HAWKEYE_API_URL': '"http://localhost:3001"',
    'DEFAULT_CATALOGUE_ID': '"54eb6c99-71ff-4e1a-b4fc-a7832caea563"',
    'PRODUCTION_BUCKET': 'io-proversity-media',
    'FOOTAGE_BUCKET': 'io-proversity-footage'
  })
]

devPlugins.map((plugin) => {
  config.plugins.push(plugin)
})

module.exports = config;