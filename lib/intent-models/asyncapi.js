
module.exports = {};  
const IntentBase = require('./base');
const { IntentChannel } = require('./channel');
const { IntentMessage } = require('./message');
const { IntentSecurityScheme } = require('./security-scheme');
const { IntentInfo } = require('./info');
const { IntentOperation } = require('./operation');
const Schema = require('../models/schema');
const { IntentServer } = require('./server');
const { IntentExternalDocument } = require('./external-document');
const { IntentTag } = require('./tag');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentAsyncAPIDocument
 * @extends IntentBase
 */
class IntentAsyncAPIDocument extends IntentBase {
  /**
   * @returns {string}
   */
  version() {
    return '2.0.0';
  }
  
  /**
   * 
   * @param {string} contentType 
   * @returns {boolean}
   */
  hasContentType(contentType) {
    return true;
  }
  /**
   * @returns {boolean}
   */
  hasDefaultContentType() {
    return true;
  }
  /**
   * @returns {string|undefined}
   */
  defaultContentType() {
    return 'application/json';
  }

  /**
   * 
   * @returns {IntentInfo}
   */
  info() {
    return new IntentInfo();
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
   * @returns {boolean}
   */
  hasChannels() { return true; }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  channels() { return [new IntentChannel()];}

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
  messages() { return [new IntentMessage()];}

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
  operations() { return [new IntentOperation()];}

  /**
   * @returns {Schema[]}
   */
  schemas() { return [new Schema({type: 'integer'})];}

  /**
   * 
   * @returns {boolean}
   */
  hasServers() { return true; }
  /**
    * 
    * @returns {IntentServer[]}
    */
  servers() { return [new IntentServer()];}
  /**
    * 
    * @returns {IntentServer|undefined}
    */
  server(...args) { return new IntentServer();}

  /**
    * 
    * @returns {SecurityScheme[]}
    */
  securitySchemes() { return [new IntentSecurityScheme()];}
  
  /**
  * @returns {boolean}
  */
  hasTags() { return true; }
  /**
   * @returns {IntentTag[]|undefined}
   */
  tags() { return [new IntentTag()]; }
}

module.exports.IntentAsyncAPIDocument = IntentAsyncAPIDocument;
