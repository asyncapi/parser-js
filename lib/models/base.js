const { ParserError } = require('../errors');

class Base {
  constructor (json) {
    if (!json) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this._json = json;
  }

  json() {
    return this._json;
  }
}

module.exports = Base;
