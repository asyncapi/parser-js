const { mix } = require('./utils');

const Base = require('./base');

const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with the License object.
 * @class
 * @alias module:@asyncapi/parser#License
 * @extends Base
 * @mixes MixinSpecificationExtensions
 * @returns {License}
 */
class License extends Base {
  /**
   * @returns {string}
   */
  name() {
    return this._json.name;
  }
  
  /**
   * @returns {string}
   */
  url() {
    return this._json.url;
  }
}

module.exports = mix(License, MixinSpecificationExtensions);
