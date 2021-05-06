const { mix } = require('./utils');

const Base = require('./base');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with an ExternalDocs object.
 * @class
 * @alias module:@asyncapi/parser#ExternalDocs
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 * @returns {ExternalDocs}
 */
class ExternalDocs extends Base {
  /**
   * @returns {string}
   */
  url() {
    return this._json.url;
  }
}

module.exports = mix(ExternalDocs, MixinDescription, MixinSpecificationExtensions);
