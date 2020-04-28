const runmdl = require("./runMarkdownlint");
const getErrors = require("./getLintErrors");

test("Runs", () => {
    expect(runmdl("# Title\n").length).toBe(0);
});

test("Fails MD009", () => {
    const results = runmdl("# Title \n");
    const md009Errors = getErrors("MD009", results);
    expect(md009Errors.length).toBe(1);
});
