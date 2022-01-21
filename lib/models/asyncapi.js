
module.exports = {};
const { IntentChannel } = require('./channel');
const { IntentMessage } = require('./message');
const { IntentInfo } = require('./info');
const { IntentOperation } = require('./operation');
const { IntentServer } = require('./server');
const ParserError = require('../errors/parser-error');
const utils = require('../utils');
const { OperationTypes } = require('./operation-types');
const { IntentSecurityScheme } = require('./security-scheme');

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
    if (utils.isVersion2(this.document)) {
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
    // eslint-disable-next-line sonarjs/no-collapsible-if
    if (!isDefault) {
      if (utils.isVersion2(this.document)) {
        const messagesWithContentType = this.messages().filter((message) => {
          return message.contentType() === contentType;
        });
        return messagesWithContentType.length > 0;
      }
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
    if (utils.isVersion2(this.document)) {
      const defaultContentType = this.document.defaultContentType();
      return defaultContentType ? defaultContentType : undefined; 
    }
    return undefined;
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
    if (utils.isVersion2(this.document)) {
      const channels = Object.entries(this.document.channels());
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
    if (utils.isVersion2(this.document)) {
      const channels = Object.entries(this.document.channels());
      const relatedChannels = channels.filter(([,channel]) => {
        return channel.hasPublish();
      });
      return Object.keys(relatedChannels).map((path) => {
        return new IntentChannel(this.document, path);
      });
    }
    return [];
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
    if (utils.isVersion2(this.document)) {
      return Object.keys(this.document.channels()).length > 0;
    }
    return false;
  }
  /**
   * 
   * @returns {IntentChannel[]}
   */
  channels() { 
    if (utils.isVersion2(this.document)) {
      return Object.keys(this.document.channels()).map(([path]) => {
        return new IntentChannel(this.document, path);
      });
    }
    return [];
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
    const operations = this.operations();
    return operations.map((operation) => {
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
    if (utils.isVersion2(this.document)) {
      const channels = this.document.channels();
      const operations = [];
      Object.entries(channels).forEach(([path, channel]) => {
        if (channel.hasSubscribe() !== undefined) operations.push(new IntentOperation(this.document, path, [OperationTypes.ApplicationPublishing, OperationTypes.ClientSubscribing]));
        if (channel.hasPublish() !== undefined) operations.push(new IntentOperation(this.document, path, [OperationTypes.ApplicationSubscribing, OperationTypes.ClientPublishing]));
      });
      return operations;
    }
    return []; 
  }

  /**
   * @returns {Schema[]}
   */
  schemas() {
    return [];
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
    if (utils.isVersion2(this.document)) {
      return Object.keys(this.document.servers()).map((server_id) => {
        return new IntentServer(this.document, server_id);
      });
    }
    return [];
  }

  /**
   * 
   * @returns {IntentServer|undefined}
   */
  server(server_name) { 
    if (utils.isVersion2(this.document)) {
      const server = this.document.servers()[`${server_name}`];
      if (!server) return undefined;
      return new IntentServer(this.document, server_name);
    }
    return undefined;
  }

  /**
   * 
   * @returns {IntentSecurityScheme[]}
   */
  securitySchemes() {
    if (utils.isVersion2(this.document)) {
      const servers = this.servers();
      return servers.map((server) => {
        return server.security();
      });
    }
    return [];
  }
}

module.exports.IntentAsyncAPIDocument = IntentAsyncAPIDocument;
