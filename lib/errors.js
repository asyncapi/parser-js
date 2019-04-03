class ParserError extends Error {
  constructor(errs) {
    super(transformMessage(errs[0]));
    if (errs.length > 1) errs = errs.slice(1);
    this.errors = errs;
  }
}

function transformMessage(msg) {
  switch (msg) {
    case '[Invalid AsyncAPI document] Check out err.ParsingErrors() for more information.':
      return '[Invalid AsyncAPI document] Check out err.errors for more information.';
    default:
      return msg;
  }
}

module.exports.ParserError = ParserError;