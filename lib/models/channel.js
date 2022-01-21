
module.exports = {};  
const ParserError = require('../errors/parser-error');
// eslint-disable-next-line no-unused-vars
const { IntentMessage } = require('./message');
const { IntentOperation } = require('./operation');
const { IntentChannelParameter } = require('./channel-parameter');
/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannel
 */
class IntentChannel {
  /**
   * 
   * @param {AsyncAPIDocument} document 
   */
  constructor(document, channelId) {
    if (document === undefined || document === null || channelId === undefined || channelId === null) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this.document = document;
    this.channelId = channelId;
  }

  /**
   * @returns {IntentOperation[]}
   */
  operations() { return [new IntentOperation()];}

  /**
   * @returns {string}
   */
  path() { return 'some/test/path'; }

  /**
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage()];}
  
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

  /**
   * 
   * @returns {boolean}
   */
  hasParameters() { return true; }
  /**
   * 
   * @returns {IntentChannelParameter[]|undefined}
   */
  parameters() { return [new IntentChannelParameter()];}

  /**
   * 
   * @returns {boolean}
   */
  hasDescription() { return true; }
  /**
    * 
    * @returns {string|undefined} 
    */
  description() {return 'some test description';}
}

module.exports.IntentChannel = IntentChannel;
