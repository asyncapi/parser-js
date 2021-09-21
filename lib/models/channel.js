const { createMapOfType, getMapValueOfType, mix } = require('./utils');

const Base = require('./base');
const ChannelParameter = require('./channel-parameter');
const PublishOperation = require('./publish-operation');
const SubscribeOperation = require('./subscribe-operation');

const MixinDescription = require('../mixins/description');
const MixinBindings = require('../mixins/bindings');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Channel object.
 * @class
 * @alias module:@asyncapi/parser#Channel
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinBindings
 * @mixes MixinSpecificationExtensions
 * @returns {Channel}
 */
class Channel extends Base {
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
    return getMapValueOfType(this._json.parameters, name, ChannelParameter);
  }

  /**
   * @returns {boolean}
   */
  hasParameters() {
    return !!this._json.parameters;
  }

  /**
   * @returns {boolean}
   */
  hasServers() {
    return !!this._json.servers;
  }

  /**
   * @returns {String[]}
   */
  servers() {
    if (!this._json.servers) return [];
    return this._json.servers;
  }

  /**
   * @param {number} index - Index of the server.
   * @returns {String}
   */
  server(index) {
    if (!this._json.servers) return null;
    if (typeof index !== 'number') return null;
    if (index > this._json.servers.length - 1) return null;
    return this._json.servers[+index];
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
}

module.exports = mix(Channel, MixinDescription, MixinBindings, MixinSpecificationExtensions);
