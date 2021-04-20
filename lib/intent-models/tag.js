const IntentBase = require('./base');
module.exports = {};
/**
 * @class
 * @alias module:@asyncapi/parser#IntentTag
 * @extends IntentBase
 */
class IntentTag extends IntentBase {
  /**
   * @returns {string}
   */
  name() { return 'this is a tag name';}

  /**
   * @returns {boolean}
   */
  hasDescription() { return true;}

  /**
   * @returns {string|undefined}
   */
  description() { return 'this is a tag description';}
}

module.exports.IntentTag = IntentTag;
