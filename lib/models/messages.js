
module.exports = {};
// eslint-disable-next-line no-unused-vars
const { IntentMessage } = require('./message');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentMessages
 */
class IntentMessages {
  /**
   * 
   * @param {IntentMessage[]} messages
   */
  constructor(messages) {
    this.messages = messages;
  } 

  /**
   * @returns {IntentMessage[]}
   */
  filterBySend() { 
    return this.filterBy((message) => {
      return message.operations().filterBySend().lenght > 0;
    }); 
  }

  /**
   * @returns {IntentIntentMessage[]}
   */
  filterByReceive() { 
    return this.filterBy((message) => {
      return message.operations().filterByReceive().lenght > 0;
    }); 
  }

  /**
   * @returns {IntentMessage[]}
   */
  filterById(messageId) { 
    return this.filterBy((message) => {
      if (message.uid() === messageId) return true; // TODO Test!!
    }); 
  }

  /**
   * @returns {IntentMessage[]}
   */
  filterBy(callbackFn) { 
    return this.messages.filter(callbackFn); 
  }
  
  /**
   * @returns {IntentMessage[]}
   */
  all() { 
    return this.messages; 
  }

  /**
   * @returns boolean
   */
  isEmpty() {
    return this.messages.length === 0;
  }
}

module.exports.IntentMessages = IntentMessages;

