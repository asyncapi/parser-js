
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const IntentChannel = require('./channel');
const IntentMessage = require('./message');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentOperation
 * @extends IntentBase
 */
class IntentOperation extends IntentBase {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  id() {
  }

  /**
   * @returns {string}
   */
  summary() { }

  /**
   * @returns {IntentMessage[]}
   */
  messages() { }

  /**
   * @returns {IntentChannel[]}
   */
  channels() { }
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
module.exports = IntentOperation;

