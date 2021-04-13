const IntentBase = require('./Base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentSecurityScheme
 * @extends IntentBase
 * @returns {SecurityScheme}
 */
 class IntentSecurityScheme extends IntentBase {
    /**
     * @returns {string}
     */
    type() { return 'userPassword';}
    
    /**
     * @returns {string}
     */
    name() { return null; }
    
    /**
     * @returns {string}
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