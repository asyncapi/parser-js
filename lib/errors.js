class ParserError extends Error {
  constructor(errs) {
    let errors;
    if (errs.length > 1) errors = errs.slice(1);
    super(transformMessage(errs[0], errors));
    this.errors = errors;
  }
}

function transformMessage(msg, errors) {
  switch (msg) {
    case '[Invalid AsyncAPI document] Check out err.ParsingErrors() for more information.':
      return `[Invalid AsyncAPI document]\n\n${errors}`;
    default:
      return msg;
  }
}

module.exports.ParserError = ParserError;