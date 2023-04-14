#!/bin/bash

echo $PWD

commit () {
   git init
   git config user.name "silvermine"
   git config user.email "test@silvermine.com"
   git add . && git commit -m 'chore: initial commit'
}

# Without this, `npm test` will keep re-trying this script indefinitely on failure
set -o errexit

# Make generator accessible to yeoman CLI
# This is necessary to run a local generator per the documentation: https://yeoman.io/authoring/
npm link

# Make temporary test folder
if [ -d "tmp-tests" ]; then
   rm -rf tmp-tests
fi
mkdir tmp-tests
cd tmp-tests

# Node.js Library
echo '-----------------------------------------'
echo 'Generating Node.js Library'
echo '-----------------------------------------'

mkdir node-lib
cd node-lib
../../node_modules/.bin/yo @silvermine/typescript --projectName=nodeLib --isBackEnd=true --isLibrary=true --isOpenSource=true --force-install
commit
npm run standards
grunt clean build
npm test
npm run test:ci
cd ../

# Node.js Non-Library Project
echo '-----------------------------------------'
echo 'Generating Node.js Non-Library Project'
echo '-----------------------------------------'

mkdir node-project
cd node-project
../../node_modules/.bin/yo @silvermine/typescript --projectName=nodeProject --isBackEnd=true --isLibrary=false --isOpenSource=false --force-install
commit
npm run standards
npm test
npm run test:ci
cd ../

# Front-End Library
echo '-----------------------------------------'
echo 'Generating Front-End Library'
echo '-----------------------------------------'

mkdir front-end-library
cd front-end-library
../../node_modules/.bin/yo @silvermine/typescript --projectName=frontEndLibrary --isBackEnd=false --isLibrary=true --globalVarName=fel --isOpenSource=true --force-install
commit
npm run standards
grunt clean build
npm test
npm run test:ci
cd ../

# Front-End Non-Library Project
echo '-----------------------------------------'
echo 'Generating Front-End Non-Library Project'
echo '-----------------------------------------'

mkdir front-end-project
cd front-end-project
../../node_modules/.bin/yo @silvermine/typescript --projectName=frontEndProject --isBackEnd=false --isLibrary=false --isOpenSource=true --force-install
commit
npm run standards
grunt clean build
npm test
npm run test:ci
