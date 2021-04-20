
const IntentBase = require('./base');
module.exports = {}; 
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentContact
 * @extends IntentBase
 */
class IntentContact extends IntentBase {
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
  
  /**
   * 
   * @returns {boolean}
   */
  hasEmail() { return true; }
  /**
   * @returns {string|undefined}
   */
  email() {return 'test@test.com'; }
}

module.exports.IntentContact = IntentContact;
