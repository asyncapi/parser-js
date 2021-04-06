const ParserError = require('../errors/parser-error');

/**
 * Implements common functionality for all the models.
 * @class
 * @alias module:@asyncapi/parser#IntentBase
 * @returns {IntentBase}
 */
class IntentBase {
  constructor (json) {
    if (!json) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this._json = json;

    Object.entries(json).forEach(([key, value]) => {
      if (key.startsWith('x-')) { // extensions
        key = key.replace("-", "_");
      }
      
      this[key] = value;
    });
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

module.exports = IntentBase;
