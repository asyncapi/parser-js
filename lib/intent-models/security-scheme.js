const IntentBase = require('./Base');
/**
 * @enum {string}
 */
const Types = {
  UserPassword: 'userPassword',
  ApiKey: 'apiKey',
  X509: 'X509',
  SymmetricEncryption: 'symmetricEncryption',
  AsymmetricEncryption: 'asymmetricEncryption',
  HttpApiKey: 'httpApiKey',
  Http: 'http',
  Oauth2: 'oauth2',
  OpenIdConnect: 'openIdConnect',
};

/**
 * @enum {string}
 */
const ApiKeyLocations = {
  ApiKeyUser: 'user',
  ApiKeyPassword: 'password',
  HttpApiKeyQuery: 'query',
  HttpApiKeyHeader: 'header',
  HttpApiKeyCookie: 'cookie',
};
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentSecurityScheme
 * @extends IntentBase
 * @returns {SecurityScheme}
 */
class IntentSecurityScheme extends IntentBase {
  /**
     * @returns {Types}
     */
  type() { return Types.UserPassword;}
    
  /**
     * @returns {string}
     */
  name() { return null; }
    
  /**
     * @returns {ApiKeyLocations}
     */
  in() { return null; }
    
  /**
     * @returns {string}
     */
  scheme() { return null; }
    
  /**
     * @returns {string}
     */
  bearerFormat() { return null; }
    
  /**
     * @returns {string}
     */
  description() { return 'Security Scheme description'; }
}

module.exports = IntentSecurityScheme;