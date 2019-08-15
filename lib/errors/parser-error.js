class ParserError extends Error {
  constructor(e, json, errors) {
    super(e);

    let msg;

    if (typeof e === 'string') {
      msg = e;
    }
    if (typeof e.message === 'string') {
      msg = e.message;
    }

    if (json) {
      this.parsedJSON = json;
    }

    if (errors) {
      this.errors = errors;
    }

    this.message = msg;
  }
}

module.exports = ParserError;
