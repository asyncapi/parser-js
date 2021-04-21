
module.exports = {}; 
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const { IntentChannel } = require('./channel');
const { IntentMessage } = require('./message');
const { IntentServer } = require('./server');
const { IntentExternalDocument } = require('./external-document');
const { IntentTag } = require('./tag');

/**
 * @enum {string}
 */
const Types = {
  ClientSubscribing: 'ClientSubscribing',
  ClientPublishing: 'ClientPublishing',
  ApplicationSubscribing: 'ApplicationSubscribing',
  ApplicationPublishing: 'ApplicationPublishing'
};
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentOperation
 * @extends IntentBase
 */
class IntentOperation extends IntentBase {
  /**
   * @returns {string}
   */
  id() { return 'test-uid'; }

  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
   * @returns {string|undefined}
   */
  description() { return 'an operation description'; }

  /**
   * @returns {boolean}
   */
  hasSummary() { return true; }
  /**
   * @returns {string|undefined}
   */
  summary() { return 'some test summary'; }

  /**
   * @returns {boolean}
   */
  hasMultipleMessages() { return true; }
  /**
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage(), new IntentMessage()]; } 

  /**
   * @returns {IntentChannel[]}
   */
  channels() { return [new IntentChannel()]; } 
  
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
    * @returns {IntentServer[]} 
    */
  servers() {return [new IntentServer()]; }
  /**
    * 
    * @returns {IntentServer} 
    */
  server(serverArgs) {return new IntentServer(); }

  /**
    * 
    * @returns {boolean} 
    */
  isClientSubscribing() { return true; }
  /**
    * 
    * @returns {boolean} 
    */
  isClientPublishing() { return true; }
  /**
    * 
    * @returns {boolean} 
    */
  isApplicationSubscribing() { return true; }
  /**
    * 
    * @returns {boolean} 
    */
  isApplicationPublishing() { return true; }
  /**
   * @returns {Types}
   */
  type() {return Types.ApplicationPublishing; }

  /**
   * @returns {boolean}
   */
  hasExternalDocs() { return true; }
  /**
   * @returns {IntentExternalDocument|undefined}
   */
  externalDocs() { return new IntentExternalDocument(); }

  /**
   * @returns {boolean}
   */
  hasTags() { return true; }
  /**
   * @returns {IntentTag[]}
   */
  tags() { return [new IntentTag()]; }
}
module.exports.IntentOperation = IntentOperation;