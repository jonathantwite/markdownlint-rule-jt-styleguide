const runmdl = require('./runMarkdownlint');
const getErrors = require('./getLintErrors');

const genErrCases = [
    ['One.  Two.', 0],
    ['One.  Two', 0],
    ['One.  Two. ', 0],
    ['One. Two.', 1],
    ['One. Two', 1],
    ['One. Two. ', 1],
    ['One.  Two.  Three.', 0],
    ['One.  Two.  Three. ', 0],
    ['One.  Two.  Three', 0],
    ['One. Two.  Three.', 1],
    ['One. Two.  Three. ', 1],
    ['One. Two.  Three', 1],
    ['One.  Two. Three.', 1],
    ['One.  Two. Three. ', 1],
    ['One.  Two. Three', 1],
    ['One. Two. Three.', 2],
    ['One. Two. Three. ', 2],
    ['One. Two. Three', 2],
    ['* One.  Two.', 0],
    ['* One.  Two', 0],
    ['* One.  Two. ', 0],
    ['* One. Two.', 1],
    ['* One. Two', 1],
    ['* One. Two. ', 1],
    ['* One.  Two.  Three.', 0],
    ['* One.  Two.  Three. ', 0],
    ['* One.  Two.  Three', 0],
    ['* One. Two.  Three.', 1],
    ['* One. Two.  Three. ', 1],
    ['* One. Two.  Three', 1],
    ['* One.  Two. Three.', 1],
    ['* One.  Two. Three. ', 1],
    ['* One.  Two. Three', 1],
    ['* One. Two. Three.', 2],
    ['* One. Two. Three. ', 2],
    ['* One. Two. Three', 2],
    ['One.  Two.\n\n* One.  Two.', 0],
    ['One.  Two.\n\n* One.  Two', 0],
    ['One.  Two.\n\n* One.  Two. ', 0],
    ['One.  Two.\n\n* One. Two.', 1],
    ['One.  Two.\n\n* One. Two', 1],
    ['One.  Two.\n\n* One. Two. ', 1],
    ['One.  Two.\n\n* One.  Two.  Three.', 0],
    ['One.  Two.\n\n* One.  Two.  Three. ', 0],
    ['One.  Two.\n\n* One.  Two.  Three', 0],
    ['One.  Two.\n\n* One. Two.  Three.', 1],
    ['One.  Two.\n\n* One. Two.  Three. ', 1],
    ['One.  Two.\n\n* One. Two.  Three', 1],
    ['One.  Two.\n\n* One.  Two. Three.', 1],
    ['One.  Two.\n\n* One.  Two. Three. ', 1],
    ['One.  Two.\n\n* One.  Two. Three', 1],
    ['One.  Two.\n\n* One. Two. Three.', 2],
    ['One.  Two.\n\n* One. Two. Three. ', 2],
    ['One.  Two.\n\n* One. Two. Three', 2],
    ['One. Two.\n\n* One.  Two.', 1],
    ['One. Two.\n\n* One.  Two', 1],
    ['One. Two.\n\n* One.  Two. ', 1],
    ['One. Two.\n\n* One. Two.', 2],
    ['One. Two.\n\n* One. Two', 2],
    ['One. Two.\n\n* One. Two. ', 2],
    ['One. Two.\n\n* One.  Two.  Three.', 1],
    ['One. Two.\n\n* One.  Two.  Three. ', 1],
    ['One. Two.\n\n* One.  Two.  Three', 1],
    ['One. Two.\n\n* One. Two.  Three.', 2],
    ['One. Two.\n\n* One. Two.  Three. ', 2],
    ['One. Two.\n\n* One. Two.  Three', 2],
    ['One. Two.\n\n* One.  Two. Three.', 2],
    ['One. Two.\n\n* One.  Two. Three. ', 2],
    ['One. Two.\n\n* One.  Two. Three', 2],
    ['One. Two.\n\n* One. Two. Three.', 3],
    ['One. Two.\n\n* One. Two. Three. ', 3],
    ['One. Two.\n\n* One. Two. Three', 3]
];

const errLineCases = [
    ['One.  Two. Three.\n\nFour.  Five.  Six', 1],
    ['One.  Two.  Three.\n\nFour. Five.  Six', 3],
    ['One.  Two. Three.\n\n* Four.  Five.  Six', 1],
    ['One.  Two.  Three.\n\n* Four.  Five. Six', 3]
];

const errColCases = [
    ['One.  Two. Three.\n\nFour.  Five.  Six', 10],
    ['One.  Two.  Three.\n\nFour. Five.  Six', 5],
    ['One.  Two. Three.\n\n* Four.  Five.  Six', 10],
    ['One.  Two.  Three.\n\n* Four. Five.  Six', 7]
];

describe('JT04 - sentence-spacing', () => {
    test.each(genErrCases)('"%s" should generate %i errors', (str, expected) => {
        const results = runmdl(str);
        const forError = getErrors('JT04', results);
        expect(forError.length).toBe(expected);
    });

    test.each(errLineCases)('"%s" should generate error on line %i', (str, expected) => {
        const results = runmdl(str);
        const error = getErrors('JT04', results)[0];
        expect(error.lineNumber).toBe(expected);
        expect(error.fixInfo.lineNumber).toBe(expected);
    });

    test.each(errColCases)('"%s" should generate error on column %i', (str, expected) => {
        const results = runmdl(str);
        const error = getErrors('JT04', results)[0];
        expect(error.errorRange[0]).toBe(expected);
        expect(error.fixInfo.editColumn).toBe(expected);
    });
});
