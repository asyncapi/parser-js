module.exports = {}; 
const IntentBase = require('./base');
/**
 * @class
 * @alias module:@asyncapi/parser#IntentExternalDocument
 * @extends IntentBase
 */
class IntentExternalDocument extends IntentBase {
  /**
   * 
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
   * @returns {string|undefined}
   */
  description() {return 'some test title'; }

  /**
   * 
   * @returns {boolean}
   */
  hasUrl() { return true; }
  /**
   * @returns {string|undefined}
   */
  url() { return 'some test description'; }
}

module.exports.IntentExternalDocument = IntentExternalDocument;
