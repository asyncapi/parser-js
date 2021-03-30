
const Base = require('../models/Base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentMessage
 * @extends Base
 */
class IntentMessage extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {Schema}
   */
  headers() { }
  /**
   * @returns {Schema}
   */
  payload() { }
}
module.exports = IntentMessage;

