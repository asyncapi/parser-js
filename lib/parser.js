const path = require('path');
const ffi = require('ffi');
const util = require('./util');
const { GoString, ParseResult } = require('./types');
const { ParserError } = require('./errors');

const parser = ffi.Library(path.resolve(__dirname, '..', 'bin', util.getLibraryName()), {
  Parse: [ParseResult, [GoString, 'bool']],
});

module.exports.parse = (yamlOrJSONDocument, options = {}) => {
  if (typeof yamlOrJSONDocument !== 'string') {
    throw new ParserError([`[Invalid AsyncAPI document] It must be a string but found ${typeof yamlOrJSONDocument}.`]);
  }
  
  if (!yamlOrJSONDocument.trim().length) {
    throw new ParserError(['[Invalid AsyncAPI document] Document is empty.']);
  }

  yamlOrJSONGoString = new GoString();
  yamlOrJSONGoString['p'] = yamlOrJSONDocument;
  yamlOrJSONGoString['n'] = yamlOrJSONGoString['p'].length-1;
  
  const parsed = parser.Parse(yamlOrJSONGoString, !!options.circular);

  if (parsed.hasErrors) {
    parsed.err.length = parsed.errCount;
    const errs = [];
    for (let i = 0; i < parsed.errCount; i++) {
      errs.push(parsed.err[i]);
    }

    throw new ParserError(errs);
  }

  try {
    if (!parsed.result) throw new Error('[Empty result from parser] Received an empty result from the AsyncAPI parser. This is likely a problem with your document. If you are using YAML, please make sure it is properly indented.');
    return JSON.parse(parsed.result);
  } catch (e) {
    throw new ParserError([e.message]);
  }
};