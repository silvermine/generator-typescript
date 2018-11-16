import * as chai from 'chai';

let strictEquals: any = require('@silvermine/chai-strictly-equal')<% if (!isBrowser) { %>;<% } %><% if (isBrowser) { %>,
    jsdom: any = require('jsdom-global');<% } %>

chai.use(strictEquals);<% if (isBrowser) { %>
jsdom(undefined, {}); // returns a function that could be called to clean up<%_ } %>
