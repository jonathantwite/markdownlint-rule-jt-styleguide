const markdownlint = require('markdownlint');
const rules = require('../rules');

const options = {
    config: {
        default: true
    },
    files: ['./src/dev-testing/test.md'],
    customRules: rules,
    resultVersion: 3
};
const result = markdownlint.sync(options);
console.log(result);
