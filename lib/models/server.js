
module.exports = {}; 

const { IntentOperation } = require('./operation');
const { IntentServerVariable } = require('./server-variable');
const { IntentSecurityScheme } = require('./security-scheme');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentServer
 */
class IntentServer {
  /**
   * @returns {boolean}
   */
  hasName() { return true; }
  /**
   * @returns {string|undefined}
   */
  name() { return 'some test name'; }

  /**
   * @returns {boolean}
   */
  hasProtocol() { return true; }
  /**
   * @returns {string|undefined}
   */
  protocol() { return 'test-protocol'; }

  /**
   * @returns {boolean}
   */
  hasUrl() { return true; }
  /**
   * @returns {string|undefined}
   */
  url() {return 'localhost';}

  /**
   * @returns {IntentOperation[]}
   */
  operations() {return [new IntentOperation()];}

  /**
   * @returns {IntentServerVariable[]}
   */
  variables() { return [new IntentServerVariable()]; }

  /**
   * @returns {IntentSecurityScheme[]}
   */
  security() { return [new IntentSecurityScheme()]; }

  /**
   * @returns {boolean}
   */
  hasProtocolVersion() { return true; }
  /**
   * @returns {string|undefined}
   */
  protocolVersion() { return '1.0.0';}

  /**
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
   * @returns {string|undefined}
   */
  description() { return 'server description'; }

  /**
   * 
   * @param {string} bindingProtocol 
   * @returns {boolean}
   */
  hasBinding(bindingProtocol) { return true; }
  /**
    * 
    * @param {string} bindingProtocol 
    * @returns {any|undefined} 
    */
  binding(bindingProtocol) {return {};}
}
module.exports.IntentServer = IntentServer;
