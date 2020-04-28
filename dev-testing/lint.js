const markdownlint = require("markdownlint");
const rules = require("../rules");

const options = {
    "config": {
        "default": true
    },
    "files": ["C:/Users/jonat_000/source/repos/markdownlint-rule-jt-styleguide/dev-testing/test.md"],
    "customRules": rules
};
const result = markdownlint.sync(options);
console.log(result);
