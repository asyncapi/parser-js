const path = require('path');
const ffi = require('ffi');
const util = require('./util');
const { GoString, ParseResult } = require('./types');

const parser = ffi.Library(path.resolve(__dirname, '../bin', util.getLibraryName()), {
  Parse: [ParseResult, [GoString]],
});

class ParserError extends Error {
  constructor(errs) {
    super();
    this.message = JSON.stringify(errs);
    this.errors = errs;
  }
}

function parse(yamlOrJSONDocument) {
  yamlOrJSONGoString = new GoString();
  yamlOrJSONGoString['p'] = yamlOrJSONDocument;
  yamlOrJSONGoString['n'] = yamlOrJSONGoString['p'].length-1;

  const parsed = parser.Parse(yamlOrJSONGoString);

  if (parsed.hasErrors) {
    parsed.err.length = parsed.errCount;
    const errs = [];
    for (let i = 0; i < parsed.errCount; i++) {
      errs.push(parsed.err[i]);
    }

    throw new ParserError(errs);
  }

  try {
    return JSON.parse(parsed.result);
  } catch (e) {
    throw new ParserError([e]);
  }
}

module.exports = parse;