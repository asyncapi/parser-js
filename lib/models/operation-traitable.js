const { mix } = require('./utils');

const Base = require('./base');

const MixinDescription = require('../mixins/description');
const MixinTags = require('../mixins/tags');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinBindings = require('../mixins/bindings');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with the common properties Operation and OperationTrait object have.
 * @class
 * @alias module:@asyncapi/parser#OperationTraitable
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinTags
 * @mixes MixinExternalDocs
 * @mixes MixinBindings
 * @mixes MixinSpecificationExtensions
 * @returns {OperationTraitable}
 */
class OperationTraitable extends Base {
  /**
   * @returns {string}
   */
  id() {
    return this._json.operationId;
  }
  
  /**
   * @returns {string}
   */
  summary() {
    return this._json.summary;
  }
}

module.exports = mix(OperationTraitable, MixinDescription, MixinTags, MixinExternalDocs, MixinBindings, MixinSpecificationExtensions);
