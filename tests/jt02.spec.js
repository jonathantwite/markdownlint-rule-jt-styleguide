const runmdl = require('./runMarkdownlint');
const getErrors = require('./getLintErrors');

const cases = [
    ['# Title', 0],
    ['# TItle', 1],
    ['Title', 0],
    ['TItle', 1],
    ['Title.  Title', 0],
    ['Title.  TItle', 1],
    ['TItle.  Title', 1],
    ['TItle.  TItle', 2],
    ['Title.\n\nTItle', 1],
    ['Title\n\nTItle', 1],
    ['Title\n\n* BUllet', 1],
    ['Title\n\n1. LIst', 1],
    ['HR is ok', 0],
    ['So are PDFs', 0]
];

const errLineCases = [
    ['# TItle', 1],
    ['TItle', 1],
    ['* TItle', 1],
    ['1. TItle', 1],
    ['Title.  TItle', 1],
    ['TItle.  Title', 1],
    ['TItle.  TItle', 1],
    ['Title.\n\nTItle', 3],
    ['Title\n\nTItle', 3],
    ['Title\n\n* BUllet', 3],
    ['Title\n\n1. LIst', 3]
];

const errColCases = [
    ['# TItle', 3],
    ['TItle', 1],
    ['* TItle', 3],
    ['1. TItle', 4],
    ['Title.  TItle', 9],
    ['TItle.  Title', 1],
    ['Title.\n\nTItle', 1],
    ['Title\n\nTItle', 1],
    ['Title\n\n* BUllet', 3],
    ['Title\n\n1. LIst', 4]
];

describe('JT02 - sentence-start-capitalisation', () => {
    test.each(cases)('"%s" should generate %i errors', (str, expected) => {
        const results = runmdl(str);
        const forError = getErrors('JT02', results);
        expect(forError.length).toBe(expected);
    });

    test.each(errLineCases)('"%s" should generate error on line %i', (str, expected) => {
        const results = runmdl(str);
        const error = getErrors('JT02', results)[0];
        expect(error.lineNumber).toBe(expected);
        expect(error.fixInfo.lineNumber).toBe(expected);
    });

    test.each(errColCases)('"%s" should generate error on column %i', (str, expected) => {
        const results = runmdl(str);
        const error = getErrors('JT02', results)[0];
        expect(error.errorRange[0]).toBe(expected);
        expect(error.fixInfo.editColumn).toBe(expected);
    });
});
