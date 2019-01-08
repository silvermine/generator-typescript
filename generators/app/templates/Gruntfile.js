'use strict';

<% if (isBrowser) { _%>
function getEnvironment(grunt) {
   const TYPES = [ 'prd', 'dev' ],
         env = grunt.option('env');

   return TYPES.indexOf(env) === -1 ? 'dev' : env;
}

<% } _%>
module.exports = (grunt) => {
   <%_ if (isBrowser) { _%>
   const ENVIRONMENT = getEnvironment(grunt);

   <%_ } _%>
   let config;

   config = {
      entryFile: './src/index.ts',
      js: {
         all: [
            'Gruntfile.js',
            './src/**/*.js',
            './tests/**/*.js',
         ],
      },
      ts: {
         src: './src/**/*.ts',
         all: [
            './src/**/*.ts',
            './tests/**/*.ts',
         ],
         configs: {
            standards: 'tsconfig.json',
            <%_ if (isLibrary) { _%>
            commonjs: 'src/tsconfig.commonjs.json',
            esm: 'src/tsconfig.esm.json',
            types: 'src/tsconfig.types.json',
            <%_ } _%>
         },
      },
      commands: {
         tsc: './node_modules/.bin/tsc',
         <%_ if (isBrowser) { %>
         webpack: './node_modules/.bin/webpack',
         <%_ } _%>
      },
      <%_ if (isLibrary) { _%>
      out: {
         dist: './dist',
         test: [ './.nyc_output', 'coverage' ],
      },
      <%_ } _%>
   };

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: [ ...config.js.all, ...config.ts.all ],
      },

      exec: {
         options: {
            failOnError: true,
         },
         standards: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.standards} --pretty`,
         },
         <%_ if (isLibrary) { _%>
         types: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.types} --pretty`,
         },
         esm: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.esm} --pretty`,
         },
         commonjs: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.commonjs} --pretty`,
         },
         <%_ } else if (isBrowser) { _%>
         esm: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.esm} --pretty`,
         },
         <%_ } _%>
         <%_ if (isBrowser) { _%>
         webpackUMD: {
            cmd: `${config.commands.webpack} ${config.entryFile} ${ENVIRONMENT === 'prd' ? '--env.production' : ''}`,
         },
         <%_ } _%>
      },
      <%_ if (isLibrary) { %>
      clean: {
         dist: config.out.dist,
         testOutput: config.out.test,
      },
      <%_ } _%>
      <%_ if (isLibrary) { %>
      concurrent: {
         'build-ts-outputs': [ 'build-types', 'build-esm', 'build-commonjs' ],
         <%_ if (isBrowser) { _%>
         'build': [ 'build-ts-outputs', 'build-umd' ],
         <%_ } _%>
      },
      <%_ } _%>
      <%_ if (isBrowser && isLibrary) { %>
      watch: {
         ts: {
            files: [ config.ts.src ],
            tasks: [ 'build' ],
         },
      },
      <%_ } else if (isLibrary) { %>
      watch: {
         ts: {
            files: [ config.ts.src ],
            tasks: [ 'build-ts-outputs' ],
         },
      },
      <%_ } %>
   });

   grunt.loadNpmTasks('grunt-eslint');
   grunt.loadNpmTasks('grunt-exec');
   <%_ if (isLibrary) { _%>
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-concurrent');
   grunt.loadNpmTasks('grunt-contrib-watch');
   <%_ } _%>

   grunt.registerTask('standards', [ 'eslint', 'exec:standards' ]);
   grunt.registerTask('default', [ 'standards' ]);
   <%_ if (isLibrary) { _%>

   grunt.registerTask('build-types', 'exec:types');
   grunt.registerTask('build-esm', 'exec:esm');
   grunt.registerTask('build-commonjs', 'exec:commonjs');
   grunt.registerTask('build-ts-outputs', 'concurrent:build-ts-outputs');
   <%_ } _%>
   <%_ if (isBrowser) { %>
   grunt.registerTask('build-umd', 'exec:webpackUMD');
   <%_ } _%>
   <%_ if (isLibrary && isBrowser) { %>
   grunt.registerTask('build', [ 'concurrent:build' ]);
   <%_ } else if (isLibrary) { _%>
   grunt.registerTask('build', [ 'concurrent:build-ts-outputs' ]);
   <%_ } else if (isBrowser) { _%>
   grunt.registerTask('build', [ 'build-umd' ]);
   <%_ } _%>
   <%_ if (isLibrary || isBrowser) { %>
   grunt.registerTask('develop', [ 'clean', 'build', 'watch' ]);
   <%_ } %>
};
