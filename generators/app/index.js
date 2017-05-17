
'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
var mkdirp = require('mkdirp');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.pkg = require('../../package.json');
  }

  prompting() {
    let welcomeMessage = `Welcome to ${chalk.yellow.bold('react-redux')} generator.`;
    this.log(yosay(welcomeMessage));

    let prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0.0'
    },{
      type: 'input',
      name: 'description',
      message: 'Description',
      default: ""
    },{
      type: 'input',
      name: 'author',
      message: 'Author',
      default: ''
    },{
      type: 'input',
      name: 'repo',
      message: 'Git repo',
      default: 'https://github.com'
    }, {
      type: 'input',
      name: 'destinationBucket',
      message: 'AWS Bucket',
      default: '.proversity.org'
    }];

    return this.prompt(prompts)
      .then(function(answers) {
        this.name = _.replace(_.toLower(answers.name), / /g, "-");
        this.version = answers.version;
        this.description = answers.description;
        this.author = answers.author;
        this.repo = answers.repo;
        this.destinationBucket = answers.destinationBucket;
      }.bind(this));
  }

  configuring() {
    const configFiles = [
      '.babelrc', '.editorconfig', '.eslintrc', '.gitignore', 'circle.yml',
      'karma.conf.js', 'package.json', 'postcss.config.js', 'publish.sh',
      'webpack.base.js', 'webpack.config.js', 'webpack.dev.js',
      'webpack.prod.js'
    ]

    this._generateConfigFiles(configFiles);
  }

  writing() {
    this.fs.copyTpl(this.templatePath('src/'), this.destinationPath('src/'))
  }

  install() {
    this.npmInstall([
        'classnames',
        'isomorphic-fetch',
        'lodash',
        'prop-types',
        'react@15.4.0',
        'react-async-component',
        'react-dom@15.4.0',
        'react-redux@4.4.5',
        'react-router@2.8.1',
        'react-router-redux@4.0.6',
        'redux@3.6.0',
        'redux-logger',
        'redux-thunk',
      ], { 'save': true });

      this.npmInstall([
        'babel',
        'babel-core',
        'babel-eslint',
        'babel-loader',
        'babel-plugin-lodash',
        'babel-polyfill',
        'babel-preset-env',
        'babel-preset-react',
        'core-js',
        'css-loader',
        'eslint',
        'eslint-loader',
        'eslint-plugin-react',
        'extract-text-webpack-plugin',
        'favicons-webpack-plugin',
        'file-loader',
        'html-webpack-plugin',
        'lodash-webpack-plugin',
        'minimist',
        'node-sass',
        'postcss',
        'postcss-load-config',
        'postcss-loader',
        'preload-webpack-plugin',
        'raw-loader',
        'react-addons-test-utils',
        'react-hot-loader@3.0.0-beta.6',
        'rimraf',
        'sass-loader',
        'source-map-loader',
        'style-loader',
        'sw-precache-webpack-plugin',
        'url-loader',
        'webpack',
        'webpack-browser-plugin',
        'webpack-dev-server'
      ], { 'save-dev': true });
  }

  end () {
    var endMessage = `The generator ${chalk.yellow.bold('finish')} the ${chalk.yellow.bold('setup')} of your project.\n\n`;
    var howToRun =
      '\To run your project use ' +
      chalk.yellow.bold('npm start') + '\n\n'

    this.log(yosay(endMessage + howToRun));
  }

  _generateInjectForFile(file) {
    let injectFile = null;
    if (file == 'package.json') {
      injectFile = {
        name: this.name,
        version: this.version,
        description: this.description,
        main: this.main,
        author: this.author,
        repo: this.repo
      }
    } else if (file == 'circle.yml') {
      injectFile = {
        destinationBucket: this.destinationBucket
      }
    } else if (file == 'webpack.prod.js') {
      injectFile = {
        cacheName: this.name,
        sessionKey: this.name
      }
    } else if (file == 'webpack.dev.js') {
      injectFile = {
        sessionKey: this.name
      }
    }

    return injectFile
  }

  _generateConfigFiles(files) {
    files.map((file) => {
      let injectFile = this._generateInjectForFile(file)
      this.fs.copyTpl(
        this.templatePath(`config/${file}`),
        this.destinationPath(`${file}`),
        injectFile ? injectFile : null
      );

    this.config.set({'name': this.name});
    })
  }
};
