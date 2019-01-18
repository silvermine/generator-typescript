'use strict';

const Generator = require('yeoman-generator'),
      prompts = require('./prompts'),
      chalk = require('chalk'),
      yosay = require('yosay'),
      path = require('path'),
      _ = require('underscore');

module.exports = class extends Generator {

   prompting() {
      this.log(yosay(`Let's generate a ${chalk.red('TypeScript')} project!`));

      return this.prompt(prompts({ folderName: this._getFolderName() }))
         .then((answers) => {
            this.answers = _.extend({}, answers);
         });
   }

   _getFolderName() {
      return path.basename(this.destinationRoot());
   }

   configuring() {
      this.answers.author = this.user.git.name();
      this.answers.currentYear = (new Date()).getFullYear();
      this.answers.isBrowser = !this.answers.isBackEnd;
   }

   writing() {
      this._generateProjectConfigFiles();
      this._generateSrcFolder();
      this._generateTests();
      this._generateGruntfile();
      this._addTsConfigFiles();
   }

   install() {
      this.npmInstall();
   }

   _generateProjectConfigFiles() {
      this._generatePackageJSON();
      this._copyTemplate([ '.eslintrc.json' ]);
      this._copyTemplate([ 'README.md' ]);
      this._copyTemplate([ '.gitignore' ]);
      this._copyTemplate([ 'npmignore-template' ], [ '.npmignore' ]);
      this._copyTemplate([ '.nvmrc' ]);
      if (this.answers.isBrowser) {
         this._copyTemplate([ 'webpack.config.js' ]);
      }
      if (this.answers.isOpenSource) {
         this._copyTemplate([ 'LICENSE' ]);
      }
   }

   _generatePackageJSON() {
      this._copyTemplate([ 'package.json' ]);
   }

   _generateSrcFolder() {
      this._copyTemplate([ 'src', 'index.ts' ]);
      this._copyTemplate([ 'src', 'Example.ts' ]);
   }

   _generateTests() {
      this._copyTemplate([ 'tests', 'index.test.ts' ]);
      this._copyTemplate([ 'tests', 'setup', 'before.ts' ]);
      this._copyTemplate([ 'tests', '.eslintrc.json' ]);
      this._copyTemplate([ '.mocha.opts' ]);
      this._copyTemplate([ '.nycrc.json' ]);
   }

   _generateGruntfile() {
      this._copyTemplate([ 'Gruntfile.js' ]);
   }

   _addTsConfigFiles() {
      let configFiles = [];

      if (this.answers.isLibrary) {
         configFiles = [
            'tsconfig.commonjs.json',
            'tsconfig.esm.json',
            'tsconfig.types.json',
         ];
      } else if (this.answers.isBrowser) {
         configFiles = [ 'tsconfig.esm.json' ];
      }

      _.forEach(configFiles, (fileName) => {
         this._copyTemplate([ 'src', fileName ]);
      });

      // Add root tsconfig
      this._copyTemplate([ 'tsconfig.json' ]);
      // Add tsconfig for tests
      this._copyTemplate([ 'tests', 'tsconfig.json' ]);
   }

   _copyTemplate(pathParts, destPathParts) {
      this.fs.copyTpl(
         this.templatePath.apply(this, pathParts),
         this.destinationPath.apply(this, destPathParts || pathParts),
         this.answers
      );
   }
};
