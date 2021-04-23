
module.exports = {}; 
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const { IntentMessage } = require('./message');
const { IntentOperation } = require('./operation');
const { IntentChannelParameter } = require('./channel-parameter');

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
  path() { return 'some/test/path'; }

  /**
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage()];}
  
  /**
   * 
   * @param {string} bindingProtocol 
   * @returns {boolean}
   */
  hasBinding(bindingProtocol) { return true; }
  /**
    * 
    * @param {string} bindingProtocol 
    * @returns {any|undefined} 
    */
  binding(bindingProtocol) {return {};}

  /**
   * 
   * @returns {boolean}
   */
  hasParameters() { return true; }
  /**
   * 
   * @returns {IntentChannelParameter[]|undefined}
   */
  parameters() { return [new IntentChannelParameter()];}

  /**
   * 
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
    * 
    * @returns {string|undefined} 
    */
  description() {return 'some test description';}
}
module.exports.IntentChannel = IntentChannel;
