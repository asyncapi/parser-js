module.exports = {};
const IntentBase = require('./base');
/**
 * Implements functions to deal with a CorrelationId object.
 * @class
 * @alias module:@asyncapi/parser#IntentCorrelationId
 * @extends IntentBase
 */
class IntentCorrelationId extends IntentBase {
  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
   * @returns {string|undefined}
   */
  description() { return 'a message description'; }

  /**
   * @returns {boolean}
   */
  hasLocation() { return true; }
  /**
   * @returns {string|undefined}
   */
  location() { return '$message.header#/correlationId'; }
}

module.exports.IntentCorrelationId = IntentCorrelationId;
