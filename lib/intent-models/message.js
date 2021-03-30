
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
   * @returns {string}
   */
  uid() {
    return this.name() || this.ext('x-parser-message-name') || Buffer.from(JSON.stringify(this._json)).toString('base64');
  }

  /**
   * @returns {string}
   */
  name() { }

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

