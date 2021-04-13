
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
const IntentOperation = require('./operation');

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
  operations() { return [new IntentOperation()];}
  /**
   * @returns {string}
   */
  path() {return 'some/test/path';}
  /**
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage()];}
  /**
   * 
   * @returns {any} 
   */
  extension(extensionProperty) {return {};}
  /**
    * 
    * @returns {any} 
    */
  binding(bindingProtocol) {return {};}
  /**
   * 
   * @returns {Schema[]}
   */
  parameters() { return [new Schema({})];}
  /**
    * 
    * @returns {string} 
    */
  description() {return 'some test description';}
}
module.exports = IntentChannel;
