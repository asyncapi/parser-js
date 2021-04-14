const { mix } = require('./utils');

const Base = require('./base');
const Schema = require('./schema');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a ChannelParameter object.
 * @class
 * @alias module:@asyncapi/parser#ChannelParameter
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 * @returns {ChannelParameter}
 */
class ChannelParameter extends Base {
  /**
   * @returns {string}
   */
  location() {
    return this._json.location;
  }
  
  /**
   * @returns {Schema}
   */
  schema() {
    if (!this._json.schema) return null;
    return new Schema(this._json.schema);
  }
}

module.exports = mix(ChannelParameter, MixinDescription, MixinSpecificationExtensions);
