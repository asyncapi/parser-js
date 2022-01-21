
module.exports = {};
const ParserError = require('../../errors/parser-error');
const { IntentContact } = require('./contact');
const { IntentExternalDocument } = require('./external-document');
const { IntentLicense } = require('./license');
const { IntentTag } = require('./tag');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentInfo
 */
class IntentInfo {
  /**
   * 
   * @param {AsyncAPIDocument} document 
   */
  constructor(document) {
    if (document === undefined || document === null) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this.document = document;
  }

  /**
   * @returns {string}
   */
  title() { return 'some test title'; }

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
  externalDocs() { return new IntentExternalDocument(); }

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

  /**
  * @returns {boolean}
  */
  hasTags() { return true; }
  /**
   * @returns {IntentTag[]|undefined}
   */
  tags() { return [new IntentTag()]; }
}

module.exports.IntentInfo = IntentInfo;
