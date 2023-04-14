# <%= projectName %>

<%_ if (isOpenSource) { _%>
[![NPM Version][npm-version]][npm-version-url]
[![License][license-badge]][license-url]
[![Build Status][build-status]][build-status-url]
[![Coverage Status][coverage-status]][coverage-status-url]
[![Conventional Commits][conventional-commits-url]

<%_ } _%>
## What?

## Why?
<% if (isOpenSource) { _%>

## License

This software is released under the MIT license. See [the license
file][license-url] for more details.

[npm-version]: https://img.shields.io/npm/v/@silvermine/<%= projectName %>.svg
[npm-version-url]: https://www.npmjs.com/package/@silvermine/<%= projectName %>
[license-badge]: https://img.shields.io/github/license/silvermine/<%= projectName %>.svg
[license-url]: ./LICENSE
[build-status]: https://github.com/silvermine/<%= projectName %>/actions/workflows/ci.yml/badge.svg
[build-status-url]: https://travis-ci.org/silvermine/<%= projectName %>.svg?branch=master
[coverage-status]: https://coveralls.io/repos/github/silvermine/<%= projectName %>/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/silvermine/<%= projectName %>?branch=master
[conventional-commits-url]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
<%_ } %>
