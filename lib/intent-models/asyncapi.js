
const Base = require('../models/Base');
// eslint-disable-next-line no-unused-vars
const IntentChannel = require('./channel');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const SecurityScheme = require('../models/security-scheme');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentAsyncAPIDocument
 * @extends Base
 */
class IntentAsyncAPIDocument extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * 
   * @param {*} contentType 
   * @returns {boolean}
   */
  hasContentType(contentType) {}
  /**
   * 
   * @param {*} role
   * @returns {IntentChannel[]} 
   */
  channels() {}
  /**
   * 
   * @param {*} role
   * @returns {IntentChannel[]} 
   */
  channelsSubscribes(role) {}
  /**
   * 
   * @param {*} role
   * @returns {IntentChannel[]} 
   */
  channelsPublishes(role) {}
  /**
   * 
   * @param {*} role
   * @returns {boolean} 
   */
  isSubscribingToChannels(role) {}
  /**
   * 
   * @param {*} role
   * @returns {boolean} 
   */
  isPublishingToChannels(role) {}
  /**
   * 
   * @param {*} role
   * @returns {IntentMessage[]} 
   */
  messages(role) {}
  /**
   * @returns {Schema}
   */
  schemas() {}
  /**
   * @returns {Server[]}
   */
  servers() {}
  /**
   * @returns {Server}
   */
  server(serverName) {}
  /**
   * @returns {SecurityScheme}
   */
  securitySchemes() {}
}
module.exports = IntentAsyncAPIDocument;
