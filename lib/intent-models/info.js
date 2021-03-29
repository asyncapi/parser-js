
const Base = require('../models/Base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser/intents#Info
 * @extends Base
 */
class Info extends Base {
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
module.exports = Info;
