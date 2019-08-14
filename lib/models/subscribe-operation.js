const Operation = require('./operation');

/**
 * @class
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
