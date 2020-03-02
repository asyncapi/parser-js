const { createMapOfType, getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const ChannelParameter = require('./channel-parameter');
const PublishOperation = require('./publish-operation');
const SubscribeOperation = require('./subscribe-operation');

/**
 * Implements functions to deal with a Channel object.
 * @class
 * @extends Base
 * @returns {Channel}
 */
class Channel extends Base {
  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }
  
  /**
   * @returns {Object<string, ChannelParameter>}
   */
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  /**
   * @param {string} name - Name of the parameter.
   * @returns {ChannelParameter}
   */
  parameter(name) {
    return getMapKeyOfType(this._json.parameters, name, ChannelParameter);
  }

  /**
   * @returns {boolean}
   */
  hasParameters() {
    return !!this._json.parameters;
  }

  /**
   * @returns {PublishOperation}
   */
  publish() {
    if (!this._json.publish) return null;
    return new PublishOperation(this._json.publish);
  }

  /**
   * @returns {SubscribeOperation}
   */
  subscribe() {
    if (!this._json.subscribe) return null;
    return new SubscribeOperation(this._json.subscribe);
  }

  /**
   * @returns {boolean}
   */
  hasPublish() {
    return !!this._json.publish;
  }

  /**
   * @returns {boolean}
   */
  hasSubscribe() {
    return !!this._json.subscribe;
  }
  
  /**
   * @returns {Object}
   */
  bindings() {
    return this._json.bindings || null;
  }

  /**
   * @param {string} name - Name of the binding.
   * @returns {Object}
   */
  binding(name) {
    return this._json.bindings ? this._json.bindings[name] : null;
  }
}

module.exports = addExtensions(Channel);
