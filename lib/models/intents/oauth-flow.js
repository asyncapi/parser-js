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
   * @returns {string|undefined}
   */
  authorizationUrl() {
    return 'test.com';
  }

  /**
   * @returns {string|undefined}
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
   * @returns {string|undefined}
   */
  refreshUrl() {
    return 'test.com';
  }

  /**
   * @returns {Object<string, string>|undefined}
   */
  scopes() {
    return {
      test: 'testscope'
    };
  }
}

module.exports.IntentOAuthFlow = IntentOAuthFlow;