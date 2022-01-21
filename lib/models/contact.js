module.exports = {}; 

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentContact
 */
class IntentContact {
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
