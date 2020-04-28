const runmdl = require('./runMarkdownlint');
const getErrors = require('./getLintErrors');

const cases = [
    ['# Title', 0],
    ['# title', 1],
    ['Title', 0],
    ['title', 1],
    ['Title.  Title', 0],
    ['Title.  title', 1],
    ['title.  Title', 1],
    ['title.  title', 2],
    ['Title.\n\ntitle', 1],
    ['Title\n\ntitle', 1]
];

const errLineCases = [
    ['# title', 1],
    ['title', 1],
    ['Title.  title', 1],
    ['title.  Title', 1],
    ['title.  title', 1],
    ['Title.\n\ntitle', 3],
    ['Title\n\ntitle', 3]
];

const errColCases = [
    ['# title', 3],
    ['title', 1],
    ['Title.  title', 9],
    ['title.  Title', 1],
    ['Title.\n\ntitle', 1],
    ['Title\n\ntitle', 1]
];

describe('JT01 - sentence-start-capitalisation', () => {
    test.each(cases)('"%s" should generate %i errors', (str, expected) => {
        const results = runmdl(str);
        const forError = getErrors('JT01', results);
        expect(forError.length).toBe(expected);
    });

    test.each(errLineCases)('"%s" should generate error on line %i', (str, expected) => {
        const results = runmdl(str);
        const error = getErrors('JT01', results)[0];
        expect(error.lineNumber).toBe(expected);
        expect(error.fixInfo.lineNumber).toBe(expected);
    });

    test.each(errColCases)('"%s" should generate error on column %i', (str, expected) => {
        const results = runmdl(str);
        const error = getErrors('JT01', results)[0];
        expect(error.errorRange[0]).toBe(expected);
        expect(error.fixInfo.editColumn).toBe(expected);
    });
});
