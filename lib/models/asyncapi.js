
module.exports = {};
const { IntentChannel } = require('./channel');
const { IntentMessage } = require('./message');
const { IntentInfo } = require('./info');
const { IntentOperation } = require('./operation');
const { IntentServer } = require('./server');
const ParserError = require('../errors/parser-error');
const { isVersion2 } = require('../utils');
const { OperationTypes } = require('./operation-types');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentAsyncAPIDocument
 */
class IntentAsyncAPIDocument {
  /**
   * 
   * @param {AsyncAPIDocument} document 
   */
  constructor(document) {
    if (document === undefined || document === null) throw new ParserError(`Invalid JSON to instantiate the ${this.constructor.name} object.`);
    this.document = document;
  }

  rawDocument() {
    return this.document;
  }

  /**
   * @returns {string}
   */
  version() {
    if (isVersion2(this.document)) {
      return this.document.asyncapi();
    }
  }
  
  /**
   * 
   * @param {string} contentType 
   * @returns {boolean}
   */
  hasContentType(contentType) {
    const isDefault = this.defaultContentType() === contentType;
    if (!isDefault) {

    }
    return isDefault;
  }

  /**
   * @returns {boolean}
   */
  hasDefaultContentType() {
    return !!this.defaultContentType();
  }

  /**
   * @returns {string|undefined}
   */
  defaultContentType() {
    return this.document.defaultContentType();
  }

  /**
   * @returns {IntentInfo}
   */
  info() {
    return new IntentInfo(this.document);
  }

  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationPublishableChannels() { 
    if (isVersion2(this.document)) {
      const channels = this.document.channels();
      const relatedChannels = channels.filter(([,channel]) => {
        return channel.hasSubscribe();
      });
      return Object.keys(relatedChannels).map((path) => {
        return new IntentChannel(this.document, path);
      });
    }
  }
  
  /**
   * 
   * @returns {IntentChannel[]}
   */
  applicationSubscribableChannels() {
    if (isVersion2(this.document)) {
      const channels = this.document.channels();
      const relatedChannels = channels.filter(([,channel]) => {
        return channel.hasPublish();
      });
      return Object.keys(relatedChannels).map((path) => {
        return new IntentChannel(this.document, path);
      });
    }
  }

  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientPublishableChannels() { 
    return this.applicationSubscribableChannels();
  }
  
  /**
   * 
   * @returns {IntentChannel[]}
   */
  clientSubscribableChannels() {
    return this.applicationPublishableChannels();
  }
  /**
   * 
   * @returns {boolean}
   */
  hasChannels() {
    if (isVersion2(this.document)) {
      return Object.keys(this.document.channels()).length > 0;
    }
  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  channels() { 
    if (isVersion2(this.document)) {
      return this.document.channels.map(([path]) => {
        return new IntentChannel(this.document, path);
      });
    }
  }

  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationPublishableMessages() { 
    const relatedOperations = this.applicationPublishOperations();
    return relatedOperations.map((operation) => {
      return new IntentMessage(this.document, operation);
    });
  }
  /**
   * 
   * @returns {IntentMessage[]}
   */
  applicationSubscribableMessages() {
    const relatedOperations = this.applicationSubscribeOperations();
    return relatedOperations.map((operation) => {
      return new IntentMessage(this.document, operation);
    });
  }
  /**
    * 
    * @returns {IntentMessage[]}
    */
  clientPublishableMessages() { 
    const relatedOperations = this.clientPublishOperations();
    return relatedOperations.map((operation) => {
      return new IntentMessage(this.document, operation);
    });
  }

  /**
   * 
   * @returns {IntentMessage[]}
   */
  clientSubscribableMessages() { 
    const relatedOperations = this.clientSubscribeOperations();
    return relatedOperations.map((operation) => {
      return new IntentMessage(this.document, operation);
    });
  }
  /**
   * 
   * @returns {IntentMessage[]}
   */
  messages() { 
    const relatedOperations = this.operations();
    return relatedOperations.map((operation) => {
      return new IntentMessage(this.document, operation);
    });
  }

  /**
   * @returns {IntentOperation[]}
   */
  applicationPublishOperations() { 
    const relatedChannels = this.applicationPublishableChannels();
    return relatedChannels.map((channel) => {
      return new IntentOperation(this.document, channel, [OperationTypes.ApplicationPublishing, OperationTypes.ClientSubscribing]);
    });
  }

  /**
   * @returns {IntentOperation[]}
   */
  applicationSubscribeOperations() {
    const relatedChannels = this.applicationSubscribableChannels();
    return relatedChannels.map((channel) => {
      return new IntentOperation(this.document, channel, [OperationTypes.ApplicationSubscribing, OperationTypes.ClientPublishing]);
    });
  }

  /**
   * @returns {IntentOperation[]}
   */
  clientPublishOperations() {
    const relatedChannels = this.clientPublishableChannels();
    return relatedChannels.map((channel) => {
      return new IntentOperation(this.document, channel, [OperationTypes.ApplicationSubscribing, OperationTypes.ClientPublishing]);
    });
  }

  /**
   * @returns {IntentOperation[]}
   */
  clientSubscribeOperations() { 
    const relatedChannels = this.clientSubscribableChannels();
    return relatedChannels.map((channel) => {
      return new IntentOperation(this.document, channel, [OperationTypes.ApplicationPublishing, OperationTypes.ClientSubscribing]);
    });
  }

  /**
   * @returns {IntentOperation[]}
   */
  operations() {
    if (isVersion2(this.document)) {
      return this.channels().map((channel) => {
        const operations = [];
        if (channel.subscribe !== undefined) operations.push(OperationTypes.ApplicationPublishing, OperationTypes.ClientSubscribing);
        if (channel.publish !== undefined) operations.push([OperationTypes.ApplicationSubscribing, OperationTypes.ClientPublishing]);
        return operations.map((operationType) => {
          return new IntentOperation(this.document, channel, operationType);
        });
      });
    }
  }

  /**
   * @returns {Schema[]}
   */
  schemas() {
    const messages = this.messages();
    return messages.map((message) => {
      return message.payload();
    });
  }

  /**
   * 
   * @returns {boolean}
   */
  hasServers() {
    return this.servers().length > 0;
  }

  /**
   * 
   * @returns {IntentServer[]}
   */
  servers() { 
    if (isVersion2(this.document)) {
      return Object.keys(this.document.servers).map((server_id) => {
        return new IntentServer(this.document, server_id);
      });
    }
  }

  /**
   * 
   * @returns {IntentServer|undefined}
   */
  server(server_name) { 
    if (isVersion2(this.document)) {
      const server = this.document.servers[`${server_name}`];
      if (!server) return undefined;
      return new IntentServer(this.document, server_name);
    }
  }

  /**
   * 
   * @returns {SecurityScheme[]}
   */
  securitySchemes() {
    if (isVersion2(this.document)) {
      const servers = this.servers();
      return servers.map((server) => {
        return server.securitySchemes();
      });
    }
  }
}

module.exports.IntentAsyncAPIDocument = IntentAsyncAPIDocument;
