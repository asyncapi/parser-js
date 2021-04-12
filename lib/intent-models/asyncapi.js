
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const IntentChannel = require('./channel');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
const IntentSchema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const SecurityScheme = require('../models/security-scheme');
const IntentInfo = require('./info');
const { Schema } = require('js-yaml');
const IntentServer = require('./server');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentAsyncAPIDocument
 * @extends IntentBase
 */
class IntentAsyncAPIDocument extends IntentBase {
  constructor(...args) {
    super(...args);
  }

  /**
   * 
   * @returns {IntentInfo}
   */
  info() {
  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationPublishableChannels() { return [new IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationSubscribableChannels() { return [new IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientPublishableChannels() { return [new IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientSubscribableChannels() { return [new IntentChannel()];}
  /**
   * 
   * @returns {IntentChannel[]}
   */
  channels(...args) { return [new IntentChannel()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationPublishableMessages() { return [new IntentMessage()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationSubscribableMessages() { return [new IntentMessage()];}
  /**
    * 
    * @returns {IntentMessage[]}
    */
  clientPublishableMessages() { return [new IntentMessage()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  clientSubscribableMessages() { return [new IntentMessage()];}
  /**
   * 
   * @returns {IntentMessage[]}
   */
  messages(...args) { return [new IntentMessage()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  applicationPublishOperations() { return [new IntentOperation()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  applicationSubscribeOperations() { return [new IntentOperation()];}
  /**
     * 
     * @returns {IntentOperation[]}
     */
  clientPublishOperations() { return [new IntentOperation()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  clientSubscribeOperations() { return [new IntentOperation()];}
  /**
    * 
    * @returns {IntentOperation[]}
    */
  operations(...args) { return [new IntentOperation()];}

  /**
   * @returns {Schema[]}
   */
  schemas() { return [new Schema({type: "integer"})];}
  /**
    * 
    * @returns {IntentServer[]}
    */
  servers(...args) { return [new IntentServer()];}
  /**
    * 
    * @returns {SecurityScheme[]}
    */
  securitySchemes(...args) {  }
}

module.exports = IntentAsyncAPIDocument;
