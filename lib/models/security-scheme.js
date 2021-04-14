const { createMapOfType, mix } = require('./utils');

const Base = require('./base');
const OAuthFlow = require('./oauth-flow');

const MixinDescription = require('../mixins/description');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a SecurityScheme object.
 * @class
 * @alias module:@asyncapi/parser#SecurityScheme
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
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

module.exports = mix(SecurityScheme, MixinDescription, MixinSpecificationExtensions);
