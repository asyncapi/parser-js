
const Base = require('../models/Base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentInfo
 * @extends Base
 */
class IntentInfo extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  title() {}
  /**
   * @returns {string}
   */
  description() {}
  /**
   * @returns {string}
   */
  version() {}
}
module.exports = IntentInfo;
