
const IntentBase = require('./Base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const IntentChannel = require('./channel');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentMessage
 * @extends IntentBase
 */
class IntentMessage extends IntentBase {
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
  
  /**
   * @returns {string}
   */
  contentType() { }
  /**
   * @returns {IntentChannel[]}
   */
  channels() { }
  /**
   * @returns {IntentOperation[]}
   */
  operations() { }
  /**
   * 
   * @returns {any} 
   */
  extension(extensionProperty) {}
  /**
    * 
    * @returns {any} 
    */
  binding(bindingProtocol) {}
}
module.exports = IntentMessage;

