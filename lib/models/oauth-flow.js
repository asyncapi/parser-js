const { mix } = require('../utils');

const Base = require('./base');

const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a OAuthFlow object.
 * 
 * @class
 * @alias module:@asyncapi/parser#OAuthFlow
 * @augments Base
 * @mixes MixinSpecificationExtensions
 * @returns {OAuthFlow}
 */
class OAuthFlow extends Base {
  /**
   * @returns {string} authorizationUrl
   */
  authorizationUrl() {
    return this._json.authorizationUrl;
  }

  /**
   * @returns {string} tokenUrl
   */
  tokenUrl() {
    return this._json.tokenUrl;
  }

  /**
   * @returns {string} refreshUrl
   */
  refreshUrl() {
    return this._json.refreshUrl;
  }

  /**
   * @returns {object<string, string>} scopes
   */
  scopes() {
    return this._json.scopes;
  }
}

module.exports = mix(OAuthFlow, MixinSpecificationExtensions);
