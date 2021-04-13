const ParserError = require('../errors/parser-error');

/**
 * Implements common functionality for all the models.
 * @class
 * @alias module:@asyncapi/parser#IntentBase
 * @returns {IntentBase}
 */
class IntentBase {
  /**
   * @returns {any}
   */
  json(key) {
    return {};
  }

  /**
   * @returns {boolean}
   */
  hasExtension(key) { return true; }

  /**
   * @returns {any}
   */
  extension(key) { return `value for extension ${key}`; }
}

module.exports = IntentBase;
