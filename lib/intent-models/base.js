const ParserError = require('../errors/parser-error');

/**
 * Implements common functionality for all the models.
 * @class
 * @alias module:@asyncapi/parser#IntentBase
 * @returns {IntentBase}
 */
class IntentBase {
  constructor (json) {
    // if (!json) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    // this._json = json;
  }

  /**
   * @returns {any}
   */
  json(key) {
    return {};
  }
}

module.exports = IntentBase;
