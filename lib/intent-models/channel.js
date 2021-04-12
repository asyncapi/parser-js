
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannel
 * @extends IntentBase
 */
class IntentChannel extends IntentBase {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {IntentOperation[]}
   */
  operations() { }
  /**
   * @returns {string}
   */
  path() {}
  /**
   * @returns {IntentMessage[]}
   */
  messages() {}
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
  /**
    * 
    * @returns {string} 
    */
  description() {}
}
module.exports = IntentChannel;
