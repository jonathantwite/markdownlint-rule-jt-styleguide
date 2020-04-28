const markdownlint = require("markdownlint");
const rules = require("../rules");

const testString = "testString";

/**
 * Run markdownlint on a string and return an array of errors thrown.
 * @param {string} str - A string of the markdown to test.
 */
module.exports = function runMarkdownlint(str){
    const options = {
        "config": {
            "default": true
        },
        "strings": {testString: str},
        "customRules": rules,
        "resultVersion": 3
    };
    const result = markdownlint.sync(options);
    return result[testString];
};