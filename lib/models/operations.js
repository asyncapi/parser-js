
module.exports = {};
const { IntentOperation } = require('./operation');
const { OperationTypes } = require('./operation-types');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentOperations
 */
class IntentOperations {
  /**
   * 
   * @param {IntentOperation[]} operations 
   */
  constructor(operations) {
    this.operations = operations;
  } 

  /**
   * @returns {IntentOperation[]}
   */
  filterBySend() { 
    return this.filterBy((operation) => {
      return operation.type() === OperationTypes.Send;
    }); 
  }

  /**
   * @returns {IntentOperation[]}
   */
  filterByReceive() { 
    return this.filterBy((operation) => {
      return operation.type() === OperationTypes.Receive;
    }); 
  }

  /**
   * @returns {IntentOperation[]}
   */
  filterByChannel(channelId) { 
    return this.filterBy((operation) => {
      operation.channels().forEach(channel => {
        if (channel.path() === channelId) return true; // TODO Test!!
      });
    }); 
  }

  /**
   * @returns {IntentOperation[]}
   */
  filterBy(callbackFn) { 
    return this.operations.filter(callbackFn); 
  }
  
  /**
   * @returns {IntentOperation[]}
   */
  all() { 
    return this.operations; 
  }
}

module.exports.IntentOperations = IntentOperations;

