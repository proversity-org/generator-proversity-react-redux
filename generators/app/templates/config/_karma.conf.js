'use strict';

var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/tests.js'
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha'],
    preprocessors: {
      'test/tests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig('test'),
    webpackServer: {
      noInfo: true
    }
  });
};