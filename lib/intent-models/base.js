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
}

module.exports = IntentBase;
