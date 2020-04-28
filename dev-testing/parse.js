const filename = process.argv.slice(2)[0];
const tokenize = require("./tokenize");

const tokens = tokenize(filename);
console.log(tokens);