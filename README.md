# Silvermine TypeScript Project Yeoman Generator

[![Build Status](https://travis-ci.org/silvermine/generator-typescript.svg?branch=master)](https://travis-ci.org/silvermine/generator-typescript)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/generator-typescript/badge.svg?branch=master)](https://coveralls.io/github/silvermine/generator-typescript?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/generator-typescript.svg)](https://david-dm.org/silvermine/generator-typescript)
[![Dev Dependency Status](https://david-dm.org/silvermine/generator-typescript/dev-status.svg)](https://david-dm.org/silvermine/generator-typescript#info=devDependencies&view=table)

## What is it?

A [Yeoman](http://yeoman.io) generator for creating TypeScript projects.

## Why?

This generator can create starter code and configuration for back-end and front-end
TypeScript projects. Using it as a starting point for new TypeScript projects can help
create consistency in coding standards, project structure, and configuration across your
projects, and save you much time when setting up a new TypeScript project.

### Benefits of using this generator

Using this generator to create TypeScript projects can save hours in setup, configuration,
and debugging. Generated projects include:

   * **Tests, with code coverage reports.** Generated projects have example tests that
     include code coverage reports. Code coverage reports show coverage of the original
     TypeScript code by using source maps.
   * **Coding standards for clean TypeScript.** It makes use of strict but carefully
     considered coding standards and TypeScript compiler configuration that helps ensure
     TypeScript code is written in a clean, clear, and readable way.
   * **CommonJS, UMD, and ES Module compatibility.** Generated projects that are meant to
     be consumed by other projects (i.e. a library) support importing through CommonJS,
     UMD (if it's a front-end library), and ES Modules. TypeScript type definition files
     are generated automatically at build time.
   * **Reasonable defaults for common configuration files.** `.gitignore`, `.npmignore`,
     `package.json`, `webpack.config.js`, `LICENSE`, and `README` files are included.

## How do I use it?

First, install Yeoman globally if it's not already installed:

```bash
npm i -g yo
```

Then, install this generator:

```bash
npm i -g @silvermine/generator-typescript
```

Finally, create your project folder and run the generator in its root:

```bash
mkdir YOUR_DIR_NAME && cd YOUR_DIR_NAME
yo @silvermine/typescript
```

### What is a library?

One of the questions that the generator prompts you with is: "Is this a library?".
Answering "Yes" means that the project you are generating is meant to be published and
consumed by other projects. For example, `underscore` and `lodash` are libraries because
they are meant to be consumed by other projects.

Therefore, generated libraries include configuration to output distributable files like
CommonJS and EcmaScript Module compatible JavaScript, and TypeScript types. If your
project is not a library, these distributable file outputs are not necessary and so are
not included in your generated project. A non-library project is something like a website,
an app, or a server that serves a REST API.

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
