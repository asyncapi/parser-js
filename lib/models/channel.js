
module.exports = {};  
const ParserError = require('../errors/parser-error');
// eslint-disable-next-line no-unused-vars
const { IntentMessage } = require('./message');
const { IntentOperation } = require('./operation');
const { IntentChannelParameter } = require('./channel-parameter');
const { IntentOperations } = require('./operations');
const { OperationTypes } = require('./operation-types');
const utils = require('../utils');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannel
 */
class IntentChannel {
  /**
   * 
   * @param {string} document 
   * @param {string} channelId 
   */
  constructor(document, channelId) {
    if (document === undefined || document === null || channelId === undefined || channelId === null) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this.document = document;
    this.channelId = channelId;
  }

  /**
   * @returns {IntentOperations}
   */
  operations() { 
    // TODO should this be done in the constructor so we don't have to do it everytime this method is called?
    const operations = [];
    if (utils.isVersion2(this.document.json())) { // Ideally we should directly pass the version so we dont need to get from the document
      const channel = this.document.channel(this.channelId); // In v2.x channel id is the path
      if (channel !== undefined && channel !== null) {
        if (channel.hasSubscribe()) operations.push(new IntentOperation(this.document, this.channelId, [OperationTypes.Send]));
        if (channel.hasPublish()) operations.push(new IntentOperation(this.document, this.channelId, [OperationTypes.Receive]));
      }
    }
    return new IntentOperations(operations);
  }

  /**
   * @returns {string}
   */
  id() { return this.channelId; }

  /**
   * @returns {string}
   */
  path() { return 'some/test/path'; }

  /**
   * @returns {IntentMessage[]}
   */
  messages() { return [new IntentMessage(this.document, this.operations[0])];}
  
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
