const path = require('path');
const ffi = require('ffi');
const util = require('./util');
const { GoString, ParseResult } = require('./types');
const { ParserError } = require('./errors');

const parser = ffi.Library(path.resolve(__dirname, '..', 'bin', util.getLibraryName()), {
  Parse: [ParseResult, [GoString]],
});

module.exports.parse = (yamlOrJSONDocument) => {
  if (typeof yamlOrJSONDocument !== 'string') {
    throw new ParserError([`[Invalid AsyncAPI document] It must be a string but found ${typeof yamlOrJSONDocument}.`]);
  }
  
  if (!yamlOrJSONDocument.trim().length) {
    throw new ParserError(['[Invalid AsyncAPI document] Document is empty.']);
  }

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
    throw new ParserError([e.message]);
  }
};