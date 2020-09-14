const BaseGenerator = require('@lambdalabs/base-generator');
const klr = require('kleur');
const fs = require('fs');
const defaultFileList = require('./default-templates');
var path = require('path');
const { exit } = require('process');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.initialData = {
      includeCodeAnalysisBadge: false,
      includeCoverageBadge: false,
    };
    this.templateFiles = [].concat(defaultFileList);

    this.argument('name', {
      type: String,
      desc: 'Name of Project',
    });

    this._makePromptOption(
      'program',
      {
        type: 'list',
        message: 'What is the project type?',
        choices: [
          {
            name: 'Buid Weeks',
            value: 'bw',
          },
          {
            name: 'Labs',
            value: 'labs',
          },
        ],
        default: 'labs',
        store: true,
      },
      {
        type: String,
        alias: 'p',
        desc: 'Which program will this be used for: "bw" or "labs"',
      }
    );
    this._makePromptOption(
      'hasDS',
      {
        type: 'confirm',
        message: 'Does your project have Data Science team members?',
        default: false,
      },
      {
        type: (val) => { return (val==='false' ? false : true)},
        alias: 'd',
        desc: 'project has DS team members',
      }
    );
  }

  initializing() {
    this.log(
      `Welcome to the ${klr.red('Labs')} ${klr.bold(
        'Node API'
      )} generator!\nLets get started.\nInitializing for project ${klr.bold(
        this.options.name
      )}`
    );
    this._removePrompts();
    this.initialData.projectName = this.options.name;
    this.projectDirName = this.initialData.projectName + '-be';
    this.destinationRoot(path.join(this.destinationPath(), '/' + this.projectDirName));
  }

  prompting() {
    return this.prompt(this.prompts).then((props) => {
      this.answers = props;
      this.data = Object.assign({}, this.initialData, this.answers);
    });
  }

  configuring() {
    if (this.program === 'labs') {
      this.data.includeCodeAnalysisBadge = true;
      this.data.includeCoverageBadge = true;
    }
  }

  writing() {
    const ignorePaths = [];

    if (!this.data.hasDS) {
      ignorePaths.push('**/dsService/**');
    }
    if (this.data.program === 'bw') {
      ignorePaths.push('**/config/okta.js');
    }

    this.templateFiles.forEach((file) => {
      return this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest || file.src),
        this.data,
        {},
        { globOptions: { ignore: ignorePaths } }
      );
    });
  }

  installing() {
    this.npmInstall();
  }
}
