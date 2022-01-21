
module.exports = {};
const ParserError = require('../../errors/parser-error');
const { IntentOAuthFlows } = require('./oauth-flows');

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
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentSecurityScheme
 */
class IntentSecurityScheme {
  /**
   * 
   * @param {AsyncAPIDocument} document 
   */
  constructor(document) {
    if (document === undefined || document === null) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this.document = document;
  }
  
  /**
   * @returns {Types}
   */
  type() { return Types.UserPassword; }
    
  /**
   * @returns {string}
   */
  name() { return 'security name'; }
    
  /**
   * @returns {ApiKeyLocations}
   */
  in() { return ApiKeyLocations.ApiKeyPassword; }
    
  /**
   * @returns {boolean}
   */
  hasSchema() { return true; }
  /**
   * @returns {string|undefined}
   */
  scheme() { return 'some scheme'; }
  
  /**
   * @returns {boolean}
   */
  hasBearerFormat() { return true; }  
  /**
   * @returns {string|undefined}
   */
  bearerFormat() { return null; }

  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
   * @returns {string}
   */
  description() { return 'Security Scheme description'; }

  /**
   * @returns {IntentOAuthFlows}
   */
  flows() { return new IntentOAuthFlows(); }

  /**
   * @returns {string}
   */
  openIdConnectUrl() { return 'https://asyncapi.com'; }

  /**
   * @returns {string[]}
   */
  scopes() { return ['scope']; }
}

module.exports.IntentSecurityScheme = IntentSecurityScheme;
