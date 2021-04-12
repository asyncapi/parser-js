
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
  name() { return 'some test name'; }
  /**
   * @returns {string}
   */
  protocol() { return 'test-protocol'; }
  /**
   * @returns {string}
   */
  url() {return 'localhost';}
  /**
   * @returns {IntentOperation[]}
   */
  operations() {return [new IntentOperation()];}
}
module.exports = IntentServer;
