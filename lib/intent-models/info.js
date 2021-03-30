
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
  title() {
    return this.title;
  }
  /**
   * @returns {string}
   */
  description() {
    return this.description;
  }
  /**
   * @returns {string}
   */
  version() {
    return this.version;
  }
}
module.exports = IntentInfo;
