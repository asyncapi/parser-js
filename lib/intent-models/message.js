
module.exports = {}; 
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const IntentChannel = require('./channel');
const IntentOperation = require('./operation');
const { IntentCorrelationId } = require('./correlation-id');
const { IntentTag } = require('./tag');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentMessage
 * @extends IntentMessageTrait
 */
class IntentMessage extends IntentBase {
  /**
   * @returns {string}
   */
  uid() { return 'test-uid'; }
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
   * @returns {string}
   */
  name() { return 'some test name'; }

  /**
    * @returns {string}
    */
  summary() { return 'some message summary'; }
 
  /**
    * @returns {Schema}
    */
  headers() { return new Schema({});}
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
   * @returns {Object<string, any>[]}
   */
  examples() { return {}; }  
  /**
    * 
    * @returns {string} 
    */
  correlationId() { return new IntentCorrelationId();}

  /**
  * @returns {boolean}
  */
  hasTags() { return true; }

  /**
  * @returns {IntentTag[]}
  */
  tags() { return [new IntentTag()]; }

  /**
  * @returns {boolean}
  */
  hasDescription() { return true; }

  /**
  * @returns {string}
  */
  description() { return 'a message description'; }

  /**
  * @returns {string}
  */
  schemaFormat() {
    return 'application/schema+json;version=draft-07';
  }
}
module.exports.IntentMessage = IntentMessage;

