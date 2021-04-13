
const IntentBase = require('./base');
module.exports = {};  
// eslint-disable-next-line no-unused-vars
const IntentChannel = require('./channel');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
// eslint-disable-next-line no-unused-vars
const SecurityScheme = require('../models/security-scheme');
const IntentInfo = require('./info');
const IntentOperation = require('./operation');
const Schema = require('../models/schema');
const IntentServer = require('./server');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentAsyncAPIDocument
 * @extends IntentBase
 */
class IntentAsyncAPIDocument extends IntentBase {
  /**
   * 
   * @returns {IntentInfo}
   */
  info() {
    return new IntentInfo.IntentInfo();
  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationPublishableChannels() { return [new IntentChannel.IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationSubscribableChannels() { return [new IntentChannel.IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientPublishableChannels() { return [new IntentChannel.IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientSubscribableChannels() { return [new IntentChannel.IntentChannel()];}
  /**
   * 
   * @returns boolean
   */
  hasChannels() { return true; }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  channels() { return [new IntentChannel.IntentChannel()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationPublishableMessages() { return [new IntentMessage.IntentMessage()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationSubscribableMessages() { return [new IntentMessage.IntentMessage()];}
  /**
    * 
    * @returns {IntentMessage[]}
    */
  clientPublishableMessages() { return [new IntentMessage.IntentMessage()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  clientSubscribableMessages() { return [new IntentMessage.IntentMessage()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage.IntentMessage()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  applicationPublishOperations() { return [new IntentOperation.IntentOperation()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  applicationSubscribeOperations() { return [new IntentOperation.IntentOperation()];}
  /**
     * 
     * @returns {IntentOperation[]}
     */
  clientPublishOperations() { return [new IntentOperation.IntentOperation()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  clientSubscribeOperations() { return [new IntentOperation.IntentOperation()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  operations() { return [new IntentOperation()];}
  /**
   * @returns {Schema[]}
   */
  schemas() { return [new Schema({type: 'integer'})];}
  /**
   * 
   * @returns boolean
   */
  hasServers() { return true; }
  /**
    * 
    * @returns {IntentServer[]}
    */
  servers() { return [new IntentServer.IntentServer()];}
  /**
    * 
    * @returns {IntentServer}
    */
  server(...args) { return new IntentServer.IntentServer();}
  /**
    * 
    * @returns {SecurityScheme[]}
    */
  securitySchemes() { return [new SecurityScheme({})];}
}

module.exports.IntentAsyncAPIDocument = IntentAsyncAPIDocument;
