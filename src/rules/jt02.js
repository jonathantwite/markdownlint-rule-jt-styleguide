'use strict';

const { filterTokens } = require('markdownlint-rule-helpers');

const doubleCapsRegex = RegExp('(?:^|\\s|\\n|\\r)([A-Z]{2,})[a-rt-z]', 'g');

module.exports = {
    names: ['JT02', 'double-capitalisation'],
    description: 'Words should not begin with two capitalised letters.',
    tags: ['style', 'capitalisation'],
    function: function JT02(params, onError) {
        filterTokens(params, 'inline', (token) => {
            let match = null;
            while ((match = doubleCapsRegex.exec(token.content)) !== null) {
                const column = token.line.indexOf(token.content) + match.index + 1;
                const length = match[1].length;
                const context = token.line.slice(column, column + 7) + ' ...';
                const error = {
                    lineNumber: token.lineNumber,
                    detail: 'Double capitalisation at "' + context + '"',
                    context: context,
                    range: [column, length],
                    fixInfo: {
                        lineNumber: token.lineNumber,
                        editColumn: column,
                        deleteCount: length,
                        insertText: match[1][0].toUpperCase() + match[1].slice(1).toLowerCase()
                    }
                };
                onError(error);
            }
        });
    }
};
