
module.exports = {};
const { IntentChannel } = require('./channel');
const { IntentChannels } = require('./channels');
const { IntentMessage } = require('./message');
const { IntentMessages } = require('./messages');
const { IntentInfo } = require('./info');
const { IntentOperations } = require('./operations');
const { IntentServer } = require('./server');
const { IntentServers } = require('./servers');
const ParserError = require('../errors/parser-error');
const utils = require('../utils');
// eslint-disable-next-line no-unused-vars
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
    if (utils.isVersion2(this.document.json())) {
      return this.document.version();
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
      if (utils.isVersion2(this.document.json())) {
        const messagesWithContentType = this.messages().filterBy((message) => {
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
    if (utils.isVersion2(this.document.json())) {
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
   * @returns {boolean}
   */
  hasChannels() {
    if (utils.isVersion2(this.document.json())) {
      return Object.keys(this.document.channels()).length > 0;
    }
    return false;
  }
  /**
   * 
   * @returns {IntentChannels}
   */
  channels() {
    const channels = [];
    if (utils.isVersion2(this.document.json())) {
      Object.keys(this.document.channels()).forEach((path) => {
        channels.push(new IntentChannel(this.document, path));
      });
    }
    return new IntentChannels(channels);
  }

  /**
   * 
   * @returns {IntentOperations}
   */
  operations() {
    const operations = [];
    if (utils.isVersion2(this.document.json())) {
      this.channels().all().forEach((channel) => {
        operations.push(...channel.operations().all());
      });
    }
    return new IntentOperations(operations); ;
  }

  /**
   * 
   * @returns {IntentMessages}
   */
  messages() { 
    const messages = [];
    if (utils.isVersion2(this.document.json())) {
      this.operations().all().forEach((operation) => {
        messages.push(new IntentMessage(this.document, operation));
      });
    }
    return new IntentMessages(messages);
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
    return this.servers().all().length > 0;
  }

  /**
   * 
   * @returns {IntentServers}
   */
  servers() { 
    const servers = [];
    if (utils.isVersion2(this.document.json())) {
      Object.keys(this.document.servers()).forEach((server_id) => {
        servers.push(new IntentServer(this.document, server_id));
      });
    }

    return new IntentServers(servers);
  }

  /**
   * 
   * @returns {IntentSecurityScheme[]}
   */
  securitySchemes() {
    if (utils.isVersion2(this.document.json())) {
      return this.servers().all().map((server) => {
        return server.security();
      });
    }
    return [];
  }
}

module.exports.IntentAsyncAPIDocument = IntentAsyncAPIDocument;
