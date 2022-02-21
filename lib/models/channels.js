
module.exports = {};
const { IntentChannel } = require('./channel');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannels
 */
class IntentChannels {
  /**
   * 
   * @param {IntentChannel[]} channels 
   */
  constructor(channels) {
    this.channels = channels;
  } 

  /**
   * @returns {IntentChannel[]}
   */
  filterBySend() { 
    return this.filterBy((channel) => {
      return channel.operations().filterBySend().lenght > 0;
    }); 
  }

  /**
   * @returns {IntentChannel[]}
   */
  filterByReceive() { 
    return this.filterBy((channel) => {
      return channel.operations().filterByReceive().lenght > 0;
    }); 
  }

  /**
   * @returns {IntentChannel[]}
   */
  filterById(channelId) { 
    return this.filterBy((channel) => {
      if (channel.path() === channelId) return true; // TODO Test!!
    }); 
  }

  /**
   * @returns {IntentChannel[]}
   */
  filterBy(callbackFn) { 
    return this.channels.filter(callbackFn); 
  }
  
  /**
   * @returns {IntentChannel[]}
   */
  all() { 
    return this.channels; 
  }
}

module.exports.IntentChannels = IntentChannels;

