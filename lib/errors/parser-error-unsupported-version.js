const ParserError = require('./parser-error');

class ParserErrorUnsupportedVersion extends ParserError {
  constructor(e, json) {
    super(e, json);
  }
}

module.exports = ParserErrorUnsupportedVersion;
