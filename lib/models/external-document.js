module.exports = {}; 

/**
 * @class
 * @alias module:@asyncapi/parser#IntentExternalDocument
 */
class IntentExternalDocument {
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
