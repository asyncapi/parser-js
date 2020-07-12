const Operation = require('./operation');

/**
 * Implements functions to deal with a SubscribeOperation object.
 * @class SubscribeOperation
 * @alias module:@asyncapi/parser#SubscribeOperation
 * @extends Operation
 * @returns {SubscribeOperation}
 */
class SubscribeOperation extends Operation {
  /**
   * @returns {boolean}
   */
  isPublish() {
    return false;
  }
  
  /**
   * @returns {boolean}
   */
  isSubscribe() {
    return true;
  }

  /**
   * @returns {string}
   */
  kind() {
    return 'subscribe';
  }
}

module.exports = SubscribeOperation;
