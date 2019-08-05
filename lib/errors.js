class ParserError extends Error {
  constructor(e, errors) {
    super(e);

    let msg;

    if (typeof e === 'string') {
      msg = e;
    }
    if (typeof e.message === 'string') {
      msg = e.message;
    }

    if (errors) {
      this.errors = errors;

      try {
        msg += `\n\n${JSON.stringify(errors, null, '  ')}`;
      } catch (err) {
        // We did our best...
      }
    }

    this.message = msg;
  }
}

module.exports.ParserError = ParserError;