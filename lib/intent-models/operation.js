
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
const IntentChannel = require('./channel');
const IntentMessage = require('./message');
const IntentServer = require('./server');
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
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  id() { return 'test-uid'; }

  /**
   * @returns {string}
   */
  summary() { return 'some test summary' }

  /**
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage()]; } 

  /**
   * @returns {IntentChannel[]}
   */
  channels() { return [new IntentChannel()]; } 
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
    * @returns {IntentServer[]} 
    */
  servers() {return [new IntentServer()];}
  /**
    * 
    * @returns {IntentServer} 
    */
  server(serverArgs) {return new IntentServer();}
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
  type() {return Types.ApplicationPublishing;}
}
module.exports = IntentOperation;

