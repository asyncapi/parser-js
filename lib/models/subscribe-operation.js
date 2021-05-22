const Operation = require('./operation');

/**
 * Implements functions to deal with a SubscribeOperation object.
 * 
 * @class
 * @alias module:@asyncapi/parser#SubscribeOperation
 * @augments Operation
 * @returns {SubscribeOperation}
 */
class SubscribeOperation extends Operation {
  /**
   * @returns {boolean} false
   */
  isPublish() {
    return false;
  }
  
  /**
   * @returns {boolean} true
   */
  isSubscribe() {
    return true;
  }

  /**
   * @returns {string} kind
   */
  kind() {
    return 'subscribe';
  }
}

module.exports = SubscribeOperation;
