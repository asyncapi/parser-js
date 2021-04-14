const IntentBase = require('./base');

const MixinDescription = require('../mixins/description');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * @class
 * @alias module:@asyncapi/parser#IntentTag
 * @extends IntentBase
 */
class IntentTag extends IntentBase {
  /**
   * @returns {string}
   */
  name() { return 'this is a tag name';}

  /**
   * @returns {boolean}
   */
   hasDescription() { return true;}

  /**
   * @returns {string}
   */
  description() { return 'this is a tag description';}
}

module.exports = IntentTag
