
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
        cacheName: this.name
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

  _generateFiles(folder, files, includeParent, includeDot) {
    const parent = includeParent ? folder : "";
    const dot = includeDot ? '.' : '';
    files.map((file) => {
      this.fs.copyTpl(
        this.templatePath(`${folder}_${file}`),
        this.destinationPath(`${parent}${dot}${file}`)
      );
    });
  }
};
