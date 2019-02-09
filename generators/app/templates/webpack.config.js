'use strict';

const path = require('path'),
      pkg = require('./package.json');

function getFileNameFromPackageName(packageName) {
   const NAME_PARTS = packageName.split('/');

   return NAME_PARTS[NAME_PARTS.length - 1];
}

module.exports = function(env) {
   const DIST = path.resolve(__dirname, 'dist');

   env = env || {};

   return {
      mode: env.production ? 'production' : 'development',
      devtool: env.production ? false : 'eval-source-map',
      output: {
         <%_ if (isLibrary) { _%>
         // The name of the global variable that will be exported when the UMD
         // bundle is executed.
         library: '<%= globalVarName %>',
         // Use this config property when using `export default` in the entry file, (which
         // you only need to do if the main variable your library exports is a function,
         // rather than an object):
         // libraryExport: 'default'
         libraryTarget: 'umd',
         <%_ } _%>
         // Use `this` instead of `window` as the global variable that the UMD
         // bundle sets the library to when executed in a node.js context.
         //
         // Ironically, if we don't set this configuration value to `this`, the UMD
         // bundle will throw a `ReferenceError: "window" is undefined` error when
         // executed in node.js.
         globalObject: 'this',
         path: DIST,
         filename: `${getFileNameFromPackageName(pkg.name)}.js`,
      },
      // Let webpack recognize both javascript and typescript files
      resolve: {
         extensions: [ '.js', '.ts' ],
      },
      // This enables tree shaking by telling webpack that no files in our project
      // contain side effects, allowing it to remove any code that is not imported.
      // If we do eventually have a file that has side effects, we'd add the paths
      // to those files here.
      optimization: {
         sideEffects: false,
      },
      module: {
         rules: [
            // all files with a `.ts` extension will be handled by `ts-loader`
            {
               test: /\.ts$/,
               loader: 'ts-loader',
               options: {
                  configFile: env.tsconfig || path.resolve(__dirname, 'src', 'tsconfig.esm.json'),
               },
            },
         ],
      },
   };
};
