
const Base = require('../models/Base');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser/intents#Server
 * @extends Base
 */
class Server extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  name() {}
  /**
   * @returns {string}
   */
  protocol() {}
}
module.exports = Server;
