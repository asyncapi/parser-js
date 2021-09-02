const { mix } = require('./utils');

const Base = require('./base');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a CorrelationId object.
 * @class
 * @alias module:@asyncapi/parser#CorrelationId
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 * @returns {CorrelationId}
 */
class CorrelationId extends Base {
  /**
   * @returns {string}
   */
  location() {
    return this._json.location;
  }
}

module.exports = mix(CorrelationId, MixinSpecificationExtensions, MixinDescription);
