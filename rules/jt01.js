"use strict";

const { filterTokens } = require("markdownlint-rule-helpers");

const abbreviations = [
    "etc"
];

const abbrStr = abbreviations.reduce((str, abbr) => (str.length > 0 ? str + "|" : str) + abbr, "");

const sentenceCaseRegex = RegExp("(?<!(?:" + abbrStr + ")\\.\\s)(?<=^|\\.\\s+)([a-z])", "g");

module.exports = {
    "names": ["JT01", "sentence-start-capitalisation"],
    "description": "Sentences should not start with a lowercase letter.",
    "tags": ["style", "sentence", "capitalisation"],
    "function": function JT01(params, onError) {
        filterTokens(params, "inline", (token) => {
            let match = null;
            while((match = sentenceCaseRegex.exec(token.content)) !== null) {
                const column = token.line.indexOf(token.content) + match.index + 1;
                const length = 1;
                const error = {
                    "lineNumber": token.lineNumber,
                    "details": "Sentence starts with \"" + match[1] + "\"",
                    "context": token.line.slice(column - 1, column + 7) + " ...",
                    "range": [column, length],
                    "fixInfo": {
                        "lineNumber": token.lineNumber,
                        "editColumn": column,
                        "deleteCount": length,
                        "insertText": match[1].toUpperCase()
                    }
                }
                onError(error);
            }
        });
    }
};
