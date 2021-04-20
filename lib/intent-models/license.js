
const IntentBase = require('./base');
module.exports = {}; 
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentLicense
 * @extends IntentBase
 */
class IntentLicense extends IntentBase {
  /**
   * 
   * @returns {boolean}
   */
  hasName() { return true; }
  /**
   * @returns {string|undefined}
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
