
const IntentBase = require('./base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentInfo
 * @extends IntentBase
 */
class IntentInfo extends IntentBase {
  /**
   * @returns {string}
   */
  title() {return 'some test title'; }

  /**
   * @returns {string}
   */
  description() { return 'some test description'; }
  
  /**
   * @returns {string}
   */
  version() { return '0.0.1'; }
}

module.exports = IntentInfo;
