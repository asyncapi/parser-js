
const Base = require('../models/Base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServer
 * @extends Base
 */
class IntentServer extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  name() {}
  /**
   * @returns {string}
   */
  protocol() {}
}
module.exports = IntentServer;
