
const IntentBase = require('./base');
module.exports = {}; 
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

  /**
   * @returns {string}
   */
  termsOfService() { return 'https://www.asyncapi.com'; }
}

module.exports.IntentInfo = IntentInfo;
