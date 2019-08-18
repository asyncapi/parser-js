const { createMapOfType, addExtensions } = require('../utils');
const Base = require('./base');
const OAuthFlow = require('./oauth-flow');

/**
 * Implements functions to deal with a SecurityScheme object.
 * @class
 * @extends Base
 * @returns {SecurityScheme}
 */
class SecurityScheme extends Base {
  /**
   * @returns {string}
   */
  type() {
    return this._json.type;
  }
  
  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }
  
  /**
   * @returns {string}
   */
  name() {
    return this._json.name;
  }
  
  /**
   * @returns {string}
   */
  in() {
    return this._json.in;
  }
  
  /**
   * @returns {string}
   */
  scheme() {
    return this._json.scheme;
  }
  
  /**
   * @returns {string}
   */
  bearerFormat() {
    return this._json.bearerFormat;
  }
  
  /**
   * @returns {string}
   */
  openIdConnectUrl() {
    return this._json.openIdConnectUrl;
  }
  
  /**
   * @returns {Object<string, OAuthFlow>}
   */
  flows() {
    return createMapOfType(this._json.flows, OAuthFlow);
  }
}

module.exports = addExtensions(SecurityScheme);
