
module.exports = {}; 
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const { IntentOperation } = require('./operation');
const { IntentChannel } = require('./channel');
const { IntentCorrelationId } = require('./correlation-id');
const { IntentTag } = require('./tag');

/**
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
   * @returns {Schema}
   */
  payload() { return new Schema({type: 'integer'}); }
  /**
   * @returns {IntentChannel[]}
   */
  channels() { return [new IntentChannel()]; }
  /**
   * @returns {IntentOperation[]}
   */
  operations() { return [new IntentOperation()]; }

  /**
    * @returns {boolean}
    */
  hasName() { return true; }
  /**
   * @returns {string|undefined}
   */
  name() { return 'some test name'; }

  /**
    * @returns {boolean}
    */
  hasSummary() { return true; }
  /**
    * @returns {string|undefined}
    */
  summary() { return 'some message summary'; }
 
  /**
    * @returns {boolean}
    */
  hasHeaders() { return true; }
  /**
    * @returns {Schema|undefined}
    */
  headers() { return new Schema({});}
  /**
   * 
   * @returns {any|undefined} 
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
    * @returns {boolean}
    */
  hasCorrelationId() { return true; }
  /**
    * @returns {IntentCorrelationId|undefined} 
    */
  correlationId() { return new IntentCorrelationId();}

  /**
  * @returns {boolean}
  */
  hasTags() { return true; }

  /**
  * @returns {IntentTag[]|undefined}
  */
  tags() { return [new IntentTag()]; }

  /**
  * @returns {boolean}
  */
  hasDescription() { return true; }

  /**
  * @returns {string|undefined}
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

