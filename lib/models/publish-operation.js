const Operation = require('./operation');

/**
 * Implements functions to deal with a PublishOperation object.
 * 
 * @class
 * @alias module:@asyncapi/parser#PublishOperation
 * @augments Operation
 * @returns {PublishOperation}
 */
class PublishOperation extends Operation {
  /**
   * @returns {boolean} true if published
   */
  isPublish() {
    return true;
  }
  
  /**
   * @returns {boolean} false if subscribed
   */
  isSubscribe() {
    return false;
  }

  /**
   * @returns {string} kind
   */
  kind() {
    return 'publish';
  }
}

module.exports = PublishOperation;
