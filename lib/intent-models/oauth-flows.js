module.exports = {};
const IntentBase = require('./base');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentOAuthFlow
 * @extends Base
 */
class IntentOAuthFlow extends IntentBase {
  /**
   * @returns {boolean}
   */
  hasAuthorizationUrl() {
    return true; 
  }
  /**
   * @returns {string}
   */
  authorizationUrl() {
    return 'test.com';
  }

  /**
   * @returns {boolean}
   */
  hasTokenUrl() {
    return true; 
  }
  /**
   * @returns {string}
   */
  tokenUrl() {
    return 'test.com';
  }

  /**
   * @returns {boolean}
   */
  hasRefreshUrl() {
    return true; 
  }
  /**
   * @returns {string}
   */
  refreshUrl() {
    return 'test.com';
  }

  /**
   * @returns {boolean}
   */
  hasScopes() {
    return true; 
  }
  /**
   * @returns {Object<string, string>}
   */
  scopes() {
    return {
      test: 'testscope'
    };
  }
}

module.exports.IntentOAuthFlow = IntentOAuthFlow;