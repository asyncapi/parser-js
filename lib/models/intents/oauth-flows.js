module.exports = {};
const IntentBase = require('./base');
const { IntentOAuthFlow } = require('./oauth-flow');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentOAuthFlows
 * @extends IntentBase
 */
class IntentOAuthFlows extends IntentBase {
  /**
   * @returns {boolean}
   */
  hasImplicit() {
    return true; 
  }
  /**
   * @returns {IntentOAuthFlow|undefined}
   */
  implicit() {
    return new IntentOAuthFlow();
  }

  /**
   * @returns {boolean}
   */
  hasPassword() {
    return true; 
  }
  /**
   * @returns {IntentOAuthFlow|undefined}
   */
  password() {
    return new IntentOAuthFlow();
  }

  /**
   * @returns {boolean}
   */
  hasClientCredentials() {
    return true; 
  }
  /**
   * @returns {IntentOAuthFlow|undefined}
   */
  clientCredentials() {
    return new IntentOAuthFlow();
  }

  /**
   * @returns {boolean}
   */
  hasAuthorizationCode() {
    return true; 
  }
  /**
   * @returns {IntentOAuthFlow|undefined}
   */
  authorizationCode() {
    return new IntentOAuthFlow();
  }
}

module.exports.IntentOAuthFlows = IntentOAuthFlows;