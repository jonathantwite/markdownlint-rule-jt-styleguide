/**
 * Return the linting errors for a specific error code.
 * @param {string} errorCode - The error code to search for.
 * @param {LintError[]} lintErrors - Full array of errors.
 */
module.exports = function getLintErrors(errorCode, lintErrors){
    return lintErrors.filter(error => error.ruleNames[0] == errorCode)
}