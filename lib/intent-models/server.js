
const IntentBase = require('./base');
module.exports = {}; 
const IntentOperation = require('./operation');
const IntentServerVariable = require('./server-variable');
const IntentServerSecurity = require('./server-security');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServer
 * @extends IntentBase
 */
class IntentServer extends IntentBase {
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
  /**
   * @returns {IntentServerVariable[]}
   */
  variables() { return [new IntentServerVariable()]}
  /**
   * @returns {IntentServerSecurity[]}
   */
  security() { return [new IntentServerSecurity()] }
  /**
   * @returns {string}
   */
  protocolVersion() { return '1.0.0';}
  /**
   * @returns {string}
   */
  description() { return 'server description'; }
}
module.exports.IntentServer = IntentServer;
