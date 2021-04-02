
const Base = require('../models/Base');
const { mix } = require('../utils');
// eslint-disable-next-line no-unused-vars
const IntentChannel = require('./channel');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const SecurityScheme = require('../models/security-scheme');
const IntentInfo = require('./info');
const MixinSpecificationExtensions = require('../intent-mixins/specification-extensions');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentAsyncAPIDocument
 * @extends Base
 * @mixes MixinSpecificationExtensions
 */
class IntentAsyncAPIDocument extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * 
   * @returns {IntentInfo}
   */
  info() {
    return new IntentInfo({
      title: 'fake title',
      description: 'fake description',
      version: '1.0.0'
    });
  }
  /**
   * 
   * @param {*} contentType 
   * @returns {boolean}
   */
  hasContentType(contentType) {}
  /**
   * 
   * @returns {string}
   */
  defaultContentType() {}
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
   * @returns {Schema[]}
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
   * @returns {SecurityScheme[]}
   */
  securitySchemes() {}
  /**
   * @returns {Schema[]}
   */
  parameters() {}
}

module.exports = mix(IntentAsyncAPIDocument, MixinSpecificationExtensions);
