const md = require('markdown-it')();
const fs = require('fs');

module.exports = function(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const tokens = md.parse(data);

    return tokens;
};
