
module.exports = {}; 
const IntentBase = require('./base');
const { IntentContact } = require('./contact');
const { IntentExternalDocument } = require('./external-document');
const { IntentLicense } = require('./license');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentInfo
 * @extends IntentBase
 */
class IntentInfo extends IntentBase {
  /**
   * @returns {string}
   */
  title() {return 'some test title'; }

  /**
   * @returns {boolean}
   */
  hasId() {
    return true;
  }
  /**
   * @returns {string|undefined}
   */
  id() {
    return 'test-id';
  }
  
  /**
   * 
   * @returns {boolean}
   */
  hasExternalDocs() { return true; }
  /**
    * 
    * @returns {IntentExternalDocument|undefined}
    */
  externalDocs() { return new IntentExternalDocument();}

  /**
   * @returns {string}
   */
  version() { return '0.0.1'; }

  /**
   * @returns {boolean}
   */
  hasDescription() {
    return true;
  }
  /**
   * @returns {string|undefined}
   */
  description() { return 'some test description'; }

  /**
   * @returns {boolean}
   */
  hasTermsOfService() {
    return true;
  }
  /**
   * @returns {string|undefined}
   */
  termsOfService() { return 'https://www.asyncapi.com'; }

  /**
   * @returns {boolean}
   */
  hasContact() {
    return true;
  }
  /**
   * @returns {IntentContact[]|undefined}
   */
  contact() {
    return new IntentContact();
  }

  /**
   * @returns {boolean}
   */
  hasLicense() {
    return true;
  }
  /**
   * @returns {IntentLicense|undefined}
   */
  license() {
    return new IntentLicense();
  }
}

module.exports.IntentInfo = IntentInfo;
