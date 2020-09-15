const BaseGenerator = require('@lambdalabs/base-generator');
const klr = require('kleur');
const fs = require('fs');
const defaultFileList = require('./default-templates');
const path = require('path');
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

    this._makeProgram();
    this._makeHasDS();
    this._makeRepoUrl();
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
    this.projectDirName = this.initialData.projectName + '-api';
    this.destinationRoot(path.join(this.destinationPath(), '/' + this.projectDirName));
    this.options.repoUrl = (this.options.repoUrl === 'true' || this.options.repoUrl === '') ? false : this.options.repoUrl;
  }

  prompting() {
    return this.prompt(this.prompts).then((props) => {
      this.data = Object.assign({}, this.initialData, props);
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

  end() {
    if (!fs.existsSync('.git')) {
      this.log(`================\nNow lets setup the git repo for ${this.options.repoUrl || this.options.name}.\n\n`);

      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['checkout', '-b', 'main']);
      this.spawnCommandSync('git', ['add', '--all']);
      this.spawnCommandSync('git', ['commit', '-m', '"initial commit from labs spa generator"']);
      if (this.options.repoUrl) {
        this.spawnCommandSync('git', ['remote', 'add', 'origin', this.options.repoUrl]);
        this.log('pushing repo to github');
        this.spawnCommandSync('git', ['push', '-u', 'origin', 'main']);
      }
    }
  }
}
