
const IntentBase = require('./base');
// eslint-disable-next-line no-unused-vars
const Schema = require('../models/schema');
// eslint-disable-next-line no-unused-vars
const IntentMessage = require('./message');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannel
 * @extends IntentBase
 */
class IntentChannel extends IntentBase {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  path() {}
  /**
   * @returns {IntentMessage[]}
   */
  messages() {}
  /**
   * 
   * @param {*} role 
   * @returns {IntentMessage[]}
   */
  messagesPublishes(role) {}
  /**
   * 
   * @param {*} role 
   * @returns {IntentMessage[]}
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
   * @param {*} bindingProtocol 
   * @param {*} bindingProperty 
   * @returns {boolean} 
   */
  hasBinding(bindingProtocol, bindingProperty) {}
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
module.exports = IntentChannel;
