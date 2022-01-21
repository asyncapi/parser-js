module.exports = {};

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServerVariable
 */
class IntentServerVariable {
  /**
   * @returns {boolean}
   */
  hasName() { return true; }
  /**
     * @returns {string|undefined}
     */
  name() { return 'Server variable name'; }

  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
   * @returns {string|undefined}
   */
  description() { return 'Server variable description'; }

  /**
   * @returns {boolean}
   */
  hasAllowedValues() { return true; }
  /**
   * @returns {any[]}
   */
  allowedValues() { return [80, 8080]; }
  
  /**
   * @returns {boolean}
   */
  hasDefaultValue() { return true; }
  /**
   * @returns {string|undefined}
   */
  defaultValue() { return 'This is the default value for a server variable'; }

  /**
   * @returns {string[]}
   */
  examples() { return ['80']; }
}

module.exports.IntentServerVariable = IntentServerVariable;