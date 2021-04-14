
const IntentBase = require('./base');
module.exports = {}; 
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
const IntentOperation = require('./operation').IntentOperation;
const IntentChannelParameter = require('./channel-parameter');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannel
 * @extends IntentBase
 */
class IntentChannel extends IntentBase {
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
  messages() { return [new IntentMessage.IntentMessage()];}
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
  parameters() { return [new IntentChannelParameter({})];}
  /**
   * 
   * @returns boolean
   */
  hasParameters() { return true; }
  /**
    * 
    * @returns {string} 
    */
  description() {return 'some test description';}
  /**
   * 
   * @returns boolean
   */
  hasDescription() { return true; }
}
module.exports.IntentChannel = IntentChannel;
