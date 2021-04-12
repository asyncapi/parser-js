
const IntentBase = require('./base');
const IntentOperation = require('./operation');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServer
 * @extends IntentBase
 */
class IntentServer extends IntentBase {
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
  /**
   * @returns {IntentOperation[]}
   */
  operations() {return [new IntentOperation()];}
}
module.exports = IntentServer;
