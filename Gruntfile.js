'use strict';

module.exports = (grunt) => {
   let config;

   config = {
      js: {
         all: [
            'Gruntfile.js',
            './generators/app/**/*.js',
            '!./generators/app/templates/**/*',
         ],
      },
   };

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: config.js.all,
      },

   });

   grunt.loadNpmTasks('grunt-eslint');

   grunt.registerTask('standards', [ 'eslint' ]);
   grunt.registerTask('default', [ 'standards' ]);

};
