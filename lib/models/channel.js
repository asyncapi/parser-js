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
 * 
 * @class
 * @alias module:@asyncapi/parser#Channel
 * @augments Base
 * @mixes MixinDescription
 * @mixes MixinBindings
 * @mixes MixinSpecificationExtensions
 * @returns {Channel}
 */
class Channel extends Base {
  /**
   * @returns {object<string, ChannelParameter>} parameters
   */
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  /**
   * @param {string} name - Name of the parameter.
   * @returns {ChannelParameter} channel parameter for the provided name
   */
  parameter(name) {
    return getMapValueOfType(this._json.parameters, name, ChannelParameter);
  }

  /**
   * @returns {boolean} true if it has parameters, otherwise false
   */
  hasParameters() {
    return !!this._json.parameters;
  }

  /**
   * @returns {PublishOperation} publish operation
   */
  publish() {
    if (!this._json.publish) return null;
    return new PublishOperation(this._json.publish);
  }

  /**
   * @returns {SubscribeOperation} subscribe operation
   */
  subscribe() {
    if (!this._json.subscribe) return null;
    return new SubscribeOperation(this._json.subscribe);
  }

  /**
   * @returns {boolean} true if it has publish, otherwise false
   */
  hasPublish() {
    return !!this._json.publish;
  }

  /**
   * @returns {boolean} true if it has subscribe, otherwise false
   */
  hasSubscribe() {
    return !!this._json.subscribe;
  }
}

module.exports = mix(Channel, MixinDescription, MixinBindings, MixinSpecificationExtensions);
