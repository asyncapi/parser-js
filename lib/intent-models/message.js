
const IntentBase = require('./Base');
module.exports = {}; 
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const IntentChannel = require('./channel');
const IntentOperation = require('./operation');
const IntentTag = require('./tag');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentMessage
 * @extends IntentBase
 */
class IntentMessage extends IntentBase {
  /**
   * @returns {string}
   */
  uid() { return 'test-uid'; }

  /**
   * @returns {string}
   */
  name() { return 'some test name'}

  /**
   * @returns {string}
   */
  summary() { return 'some message summary'; }

  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }

  /**
   * @returns {string}
   */
  description() { return 'a message description'; }

  /**
   * @returns {boolean}
   */
  hasTags() { return true; }

  /**
   * @returns {IntentTag[]}
   */
  tags() { return [new IntentTag()]; }

  /**
   * @returns {Schema}
   */
  headers() { return new Schema({});}

  /**
   * @returns {Schema}
   */
  payload() { return new Schema({type: 'integer'});}
  /**
   * @returns {IntentChannel[]}
   */
  channels() { return [new IntentChannel.IntentChannel()];}
  /**
   * @returns {IntentOperation[]}
   */
  operations() { return [new IntentOperation.IntentOperation()];}
  /**
   * 
   * @returns {any} 
   */
  extension(extensionProperty) { return {}; } 
  /**
    * 
    * @returns {any} 
    */
  binding(bindingProtocol) { return {}; } 
  /**
    * 
    * @returns {string} 
    */
  contentType() { return 'application/json';}

  /**
   * 
   * @returns {Object<string, any>[]}
   */
  examples() { return []; }
}
module.exports.IntentMessage = IntentMessage;

