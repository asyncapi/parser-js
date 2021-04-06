
const IntentBase = require('./base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServer
 * @extends IntentBase
 */
class IntentServer extends IntentBase {
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
