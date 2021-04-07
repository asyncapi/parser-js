
const IntentBase = require('./base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentInfo
 * @extends IntentBase
 */
class IntentInfo extends IntentBase {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  title() {
  }

  /**
   * @returns {string}
   */
  description() {
  }
  
  /**
   * @returns {string}
   */
  version() {
  }
}

module.exports = IntentInfo;
