module.exports = {}; 

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentLicense
 */
class IntentLicense {
  /**
   * @returns {string}
   */
  name() {return 'some name'; }

  /**
   * 
   * @returns {boolean}
   */
  hasUrl() { return true; }
  /**
   * @returns {string|undefined}
   */
  url() {return 'test.com'; }
}

module.exports.IntentLicense = IntentLicense;
