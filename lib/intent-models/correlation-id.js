const IntentBase = require('./base');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

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
   * @returns {string}
   */
  description() { return 'a message description'; }
  /**
   * @returns {boolean}
   */
  hasLocation() { return true; }

  /**
   * @returns {string}
   */
  location() { return '$message.header#/correlationId'; }
}

module.exports.IntentCorrelationId = IntentCorrelationId;
