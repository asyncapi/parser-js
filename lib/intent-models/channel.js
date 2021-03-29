
const Base = require('../models/Base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const Message = require('./message');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser/intents#Channel
 * @extends Base
 */
class Channel extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  path() {}
  /**
   * @returns {Message[]}
   */
  messages() {}
  /**
   * 
   * @param {*} role 
   * @returns {Message[]}
   */
  messagesPublishes(role) {}
  /**
   * 
   * @param {*} role 
   * @returns {Message[]}
   */
  messagesSubscribes(role) {}
  /**
   * 
   * @param {*} role
   * @returns {boolean} 
   */
  isSubscribing(role) {}
  /**
   * 
   * @param {*} role
   * @returns {boolean} 
   */
  isPublishing(role) {}
  /**
   * @returns {string} 
   */
  description() {}
  /**
   * @returns {Schema[]} 
   */
  parameters() {}
  /**
   * 
   * @param {*} extensionProperty 
   * @returns {any} 
   */
  extension(extensionProperty) {}
  /**
   * 
   * @param {*} role
   * @param {*} extensionProperty 
   * @returns {any} 
   */
  extensionForPublishing(role, extensionProperty) {}
  /**
   * 
   * @param {*} role
   * @param {*} extensionProperty 
   * @returns {any} 
   */
  extensionForSubscribing(role, extensionProperty) {}
  /**
   * 
   * @param {*} bindingProtocol 
   * @param {*} bindingProperty 
   * @returns {any} 
   */
  binding(bindingProtocol, bindingProperty) {}
  /**
   * 
   * @param {*} role
   * @param {*} bindingProtocol 
   * @param {*} bindingProperty 
   * @returns {any} 
   */
  bindingForSubscribing(role, bindingProtocol, bindingProperty) {}
  /**
   * 
   * @param {*} role
   * @param {*} bindingProtocol 
   * @param {*} bindingProperty 
   * @returns {any} 
   */
  bindingForPublishing(role, bindingProtocol, bindingProperty) {}
  /**
   * 
   * @param {*} role
   * @returns {string} 
   */
  summaryForPublishing(role) {}
  /**
   * 
   * @param {*} role
   * @returns {string} 
   */
  summaryForSubscribing(role) {}
  /**
   * 
   * @param {*} role
   * @returns {string} 
   */
  operationIdForPublishing(role) {}
  /**
   * 
   * @param {*} role
   * @returns {string} 
   */
  operationIdForSubscribing(role) {}
}
module.exports = Channel;
