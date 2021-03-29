
const Base = require('../models/Base');
// eslint-disable-next-line no-unused-vars
const Channel = require('./channel');
// eslint-disable-next-line no-unused-vars
const Message = require('./message');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const SecurityScheme = require('../models/security-scheme');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser/intents#AsyncAPIDocument
 * @extends Base
 */
class AsyncAPIDocument extends Base {
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
   * @returns {Channel[]} 
   */
  channels() {}
  /**
   * 
   * @param {*} role
   * @returns {Channel[]} 
   */
  channelsSubscribes(role) {}
  /**
   * 
   * @param {*} role
   * @returns {Channel[]} 
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
   * @returns {Message[]} 
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
module.exports = AsyncAPIDocument;
