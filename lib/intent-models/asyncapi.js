
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const IntentChannel = require('./channel');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
const IntentSchema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const SecurityScheme = require('../models/security-scheme');
const IntentInfo = require('./info');

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
  applicationPublishableChannels() {  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationSubscribableChannels() {  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientPublishableChannels() {  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientSubscribableChannels() {  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  channels(...args) {  }
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationPublishableMessages() {  }
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationSubscribableMessages() {  }
  /**
    * 
    * @returns {IntentMessage[]}
    */
  clientPublishableMessages() {  }
  /**
   * 
   * @returns {IntentMessage[]}
   */
  clientSubscribableMessages() {  }
  /**
   * 
   * @returns {IntentMessage[]}
   */
  messages(...args) {  }
  /**
    * 
    * @returns {IntentOperation[]}
    */
  applicationPublishOperations() {  }
  /**
    * 
    * @returns {IntentOperation[]}
    */
  applicationSubscribeOperations() {  }
  /**
     * 
     * @returns {IntentOperation[]}
     */
  clientPublishOperations() {  }
  /**
    * 
    * @returns {IntentOperation[]}
    */
  clientSubscribeOperations() {  }
  /**
    * 
    * @returns {IntentOperation[]}
    */
  operations(...args) {  }

  /**
   * @returns {IntentSchema[]}
   */
  schemas() {
  }
  /**
    * 
    * @returns {IntentServer[]}
    */
  servers(...args) {  }
  /**
    * 
    * @returns {SecurityScheme[]}
    */
  securitySchemes(...args) {  }
}

module.exports = IntentAsyncAPIDocument;
