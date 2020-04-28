'use strict';

const { filterTokens } = require('markdownlint-rule-helpers');

const multiSpaceRegex = RegExp('\\.(?!\\ \\ |\\S|\\n)\\s(?!\\n)', 'g');

module.exports = {
    names: ['JT04', 'sentence-spacing'],
    description: 'Sentences should be spaced by two spaces.',
    tags: ['style', 'sentence', 'spacing'],
    function: function JT04(params, onError) {
        filterTokens(params, 'inline', (token) => {
            let match = null;
            while ((match = multiSpaceRegex.exec(token.content)) !== null) {
                const column = token.line.indexOf(token.content) + match.index + 1;
                const length = match[0].length;
                const error = {
                    lineNumber: token.lineNumber,
                    details: 'Sentences should be separated by two spaces (line: ' + token.lineNumber + ', column: ' + column + ')',
                    context: token.line.slice(Math.max(0, column - 8), length + 16) + ' ...',
                    range: [column, length],
                    fixInfo: {
                        lineNumber: token.lineNumber,
                        editColumn: column,
                        deleteCount: length,
                        insertText: '.  '
                    }
                };
                onError(error);
            }
        });
    }
};
