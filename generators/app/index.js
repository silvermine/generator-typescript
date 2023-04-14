'use strict';

const optionOrPrompt = require('yeoman-option-or-prompt'),
      Generator = require('yeoman-generator'),
      prompts = require('./prompts'),
      chalk = require('chalk'),
      yosay = require('yosay'),
      path = require('path'),
      _ = require('underscore'),
      fs = require('fs');

module.exports = class extends Generator {

   prompting() {
      this.log(yosay(`Let's generate a ${chalk.red('TypeScript')} project!`));

      return optionOrPrompt.call(this, prompts({ folderName: this._getFolderName() }))
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

   end() {
      // symlink files in dependency directories
      this._symlinkFiles();
   }

   _generateProjectConfigFiles() {
      this._generatePackageJSON();
      this._copyTemplate([ '_eslintrc.json' ], [ '.eslintrc.json' ]);
      this._copyTemplate([ 'README.md' ]);
      this._copyTemplate([ '_gitignore' ], [ '.gitignore' ]);
      this._copyTemplate([ '_npmignore' ], [ '.npmignore' ]);
      this._copyTemplate([ '_nvmrc' ], [ '.nvmrc' ]);
      this._copyTemplate([ '.github', 'workflows', '_ci.yml' ], [ '.github', 'workflows', 'ci.yml' ]);
      this._copyTemplate([ '_markdownlint.json' ], [ '.markdownlint.json' ]);
      this._copyTemplate([ 'commitlint.config.js' ]);

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
      this._copyTemplate([ 'tests', '_eslintrc.json' ], [ 'tests', '.eslintrc.json' ]);
      this._copyTemplate([ '_mocha.opts' ], [ '.mocha.opts' ]);
      this._copyTemplate([ '_nycrc.json' ], [ '.nycrc.json' ]);
   }

   _generateGruntfile() {
      let environment = this.answers.isBrowser ? 'browser' : 'node',
          type = this.answers.isLibrary ? 'lib' : 'project';

      this._copyTemplate([ 'gruntfiles', `Gruntfile-${environment}-${type}.js` ], [ 'Gruntfile.js' ]);
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

   _symlinkFiles() {
      const targetDirectory = process.cwd();

      // Symlink the editorconfig file direct to the one in @silvermine/standardization
      fs.symlink(
         `${targetDirectory}/node_modules/@silvermine/standardization/.editorconfig`,
         `${targetDirectory}/.editorconfig`,
         'file',
         () => {
            // fs.symlink requires a callback
         }
      );
   }

   _copyTemplate(pathParts, destinationPathParts) {
      this.fs.copyTpl(
         this.templatePath.apply(this, pathParts),
         this.destinationPath.apply(this, destinationPathParts || pathParts),
         this.answers
      );
   }
};
