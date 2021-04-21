
module.exports = {};
const IntentBase = require('./base');
const { IntentExternalDocument } = require('./external-document');

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
   * @returns {string|undefined}
   */
  description() { return 'this is a tag description';}

  /**
   * @returns {boolean}
   */
  hasExternalDocs() { return true; }
  /**
    * 
    * @returns {IntentExternalDocument|undefined}
    */
  externalDocs() { return new IntentExternalDocument();}
}

module.exports.IntentTag = IntentTag;
