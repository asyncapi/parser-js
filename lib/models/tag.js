const { mix } = require('./utils');

const Base = require('./base');

const MixinDescription = require('../mixins/description');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Tag object.
 * @class
 * @alias module:@asyncapi/parser#Tag
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinExternalDocs
 * @mixes MixinSpecificationExtensions
 * @returns {Tag}
 */
class Tag extends Base {
  /**
   * @returns {string}
   */
  name() {
    return this._json.name;
  }
}

module.exports = mix(Tag, MixinDescription, MixinExternalDocs, MixinSpecificationExtensions);
