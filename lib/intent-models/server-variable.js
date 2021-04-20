const IntentBase = require('./Base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServerVariable
 * @extends IntentBase
 */
class IntentServerVariable extends IntentBase {
  /**
     * @returns {string}
     */
  name() { return 'Server variable name'; }

  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }

  /**
   * @returns {string}
   */
  description() { return 'Server variable description'; }

  /**
     * @returns {any[]}
     */
  allowedValues() { return [80, 8080]; }
  
  /**
     * @returns {boolean}
     */
  hasAllowedValues() { return true; }
  
  /**
     * @returns {string}
     */
  defaultValue() { return 'This is the default value for a server variable'; }
  
  /**
     * @returns {boolean}
     */
  hasDefaultValue() { return true; }

  /**
   * @returns {string[]}
   */
  examples() { return ['80']; }
}

module.exports = IntentServerVariable;