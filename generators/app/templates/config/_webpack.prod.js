
'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const distPath = path.join(__dirname, '/dist');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const VENDOR_LIBS = [
  'chart.js', 'classnames', 'isomorphic-fetch', 'moment', 'react', 'react-async-component',
  'react-bootstrap', 'react-chartjs-2', 'react-dom', 'react-dropzone',
  'react-redux', 'react-router', 'react-router-redux', 'redux', 'redux-thunk',
  'socket.io-client', 'lodash'
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
      cacheId: 'hawkeyeCache',
      filename: 'hawkeye-cache-worker.js',
      maximumFileSizeToCacheInBytes: 4194304,
      minify: true,
      staticFileGlobsIgnorePatterns: [/dist\/.*\.html/]
    }
  ),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    'HAWKEYE_API_URL': '"https://hawkeye-api.proversity.org"',
    'DEFAULT_CATALOGUE_ID': '"54eb6c99-71ff-4e1a-b4fc-a7832caea563"',
    'PRODUCTION_BUCKET': 'org-proversity-media',
    'FOOTAGE_BUCKET': 'org-proversity-footage'
  })
]

prodPlugins.map((plugin) => {
  config.plugins.push(plugin)
})

module.exports = config;