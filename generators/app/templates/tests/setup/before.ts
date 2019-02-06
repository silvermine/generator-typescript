import * as chai from 'chai';
import enableStrictlyEqual from '@silvermine/chai-strictly-equal';<% if (isBrowser) { %>

let jsdom: any = require('jsdom-global');<% } %>

chai.use(enableStrictlyEqual);<% if (isBrowser) { %>
jsdom(undefined, {}); // returns a function that could be called to clean up<%_ } %>
