const ParserError = require('../errors/parser-error');

/**
 * Implements common functionality for all the models.
 * @class
 * @alias module:@asyncapi/parser#Base
 * @returns {Base}
 */
class Base {
  constructor (json) {
    if (!json) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this._json = json;
  }

  /**
   * @returns {any}
   */
  json(key) {
    if (key === undefined) return this._json;
    if (!this._json) return;
    return this._json[String(key)];
  }
}

module.exports = Base;
