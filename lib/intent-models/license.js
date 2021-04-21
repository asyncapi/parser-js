module.exports = {}; 
const IntentBase = require('./base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentLicense
 * @extends IntentBase
 */
class IntentLicense extends IntentBase {
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
