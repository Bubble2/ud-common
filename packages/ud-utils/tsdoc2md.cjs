'use strict'
const { generateDocumentation } = require('tsdoc-markdown');

// Generate documentation for a list of files
const nnsInputFiles = [
    './src/format.ts',
];

generateDocumentation({
    inputFiles: nnsInputFiles,
    outputFile: './README.md'
});