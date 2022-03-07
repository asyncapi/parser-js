
module.exports = {};
// eslint-disable-next-line no-unused-vars
const { IntentServer } = require('./server');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServers
 */
class IntentServers {
  /**
   * 
   * @param {IntentServer[]} servers
   */
  constructor(servers) {
    this.servers = servers;
  } 

  /**
   * @returns {IntentServer[]}
   */
  filterBySend() { 
    return this.filterBy((server) => {
      return server.operations().filterBySend().lenght > 0;
    }); 
  }

  /**
   * @returns {IntentServer[]}
   */
  filterByReceive() { 
    return this.filterBy((server) => {
      return server.operations().filterByReceive().lenght > 0;
    }); 
  }

  /**
   * @returns {IntentServer[]}
   */
  filterById(serverId) { 
    return this.filterBy((server) => {
      return server.id() === serverId;
    }); 
  }

  /**
   * @returns {IntentServer[]}
   */
  filterBy(callbackFn) { 
    return this.servers.filter(callbackFn); 
  }
  
  /**
   * @returns {IntentServer[]}
   */
  all() { 
    return this.servers; 
  }

  /**
   * @returns boolean
   */
  isEmpty() {
    return this.servers.length === 0;
  }
}

module.exports.IntentServers = IntentServers;

