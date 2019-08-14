const { ParserError } = require('../errors');

/**
 * Implements common functionality for all the models.
 * @class
 * @returns {Base}
 */
class Base {
  constructor (json) {
    if (!json) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this._json = json;
  }

  /**
   * @returns {Object}
   */
  json() {
    return this._json;
  }
}

module.exports = Base;
