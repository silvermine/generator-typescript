'use strict';

var markdownlint = require('markdownlint');

module.exports = (grunt) => {
   let config;

   config = {
      entryFile: './src/index.ts',
      docs: {
         src: {
            md: [ './README.md' ],
         },
      },
      js: {
         gruntFile: 'Gruntfile.js',
         all: [
            './*.js',
            './src/**/*.js',
            './tests/**/*.js',
         ],
      },
      ts: {
         src: './src/**/*.ts',
         all: [
            './*.ts',
            './src/**/*.ts',
            './tests/**/*.ts',
         ],
         configs: {
            standards: 'tsconfig.json',
         },
      },
      commands: {
         tsc: './node_modules/.bin/tsc',
      },
      out: {
         test: [ './.nyc_output', 'coverage' ],
      },
   };

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: [ ...config.js.all, ...config.ts.all ],
         fix: {
            src: [ ...config.js.all, ...config.ts.all ],
            options: {
               fix: true,
            },
         },
      },

      exec: {
         options: {
            failOnError: true,
         },
         standards: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.standards} --pretty`,
         },
      },

      clean: {
         testOutput: config.out.test,
      },

      watch: {
         ts: {
            files: [ config.ts.src ],
            tasks: [ 'standards' ],
         },
         gruntFile: {
            files: [ config.js.gruntFile ],
            options: {
               reload: true,
            },
         },
      },

      markdownlint: {
         all: {
            src: [ ...config.docs.src.md ],
            options: {
               // eslint-disable-next-line no-sync
               config: markdownlint.readConfigSync('.markdownlint.json'),
            },
         },
      },
   });

   grunt.loadNpmTasks('grunt-eslint');
   grunt.loadNpmTasks('grunt-exec');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-markdownlint');

   grunt.registerTask('standards', [ 'eslint:target', 'exec:standards', 'markdownlint' ]);
   grunt.registerTask('standards-fix', [ 'eslint:fix' ]);

   grunt.registerTask('develop', [ 'watch' ]);

   grunt.registerTask('default', [ 'standards' ]);
};
