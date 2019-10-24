const { createMapOfType, getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');
const Components = require('./components');
const Message = require('./message');
const Tag = require('./tag');

/**
 * Implements functions to deal with the AsyncAPI document.
 * @class
 * @extends Base
 * @returns {AsyncAPIDocument}
 */
class AsyncAPIDocument extends Base {
  constructor(...args) {
    super(...args);

    assignNameToAnonymousMessages(this);
  }

  /**
   * @returns {string}
   */
  version() {
    return this._json.asyncapi;
  }

  /**
   * @returns {Info}
   */
  info() {
    return new Info(this._json.info);
  }
  
  /**
   * @returns {string}
   */
  id() {
    return this._json.id;
  }

  /**
   * @returns {boolean}
   */
  hasServers() {
    return !!this._json.servers;
  }
  
  /**
   * @returns {Object<string, Server>}
   */
  servers() {
    return createMapOfType(this._json.servers, Server);
  }

  /**
   * @param {string} name - Name of the server.
   * @returns {Server}
   */
  server(name) {
    return getMapKeyOfType(this._json.servers, name, Server);
  }

  /**
   * @returns {boolean}
   */
  hasChannels() {
    return !!this._json.channels;
  }
  
  /**
   * @returns {Object<string, Channel>}
   */
  channels() {
    return createMapOfType(this._json.channels, Channel, this);
  }
  
  /**
   * @returns {string[]}
   */
  channelNames() {
    if (!this._json.channels) return [];
    return Object.keys(this._json.channels);
  }

  /**
   * @param {string} name - Name of the channel.
   * @returns {Channel}
   */
  channel(name) {
    return getMapKeyOfType(this._json.channels, name, Channel, this);
  }

  /**
   * @returns {string}
   */
  defaultContentType() {
    return this._json.defaultContentType || null;
  }

  /**
   * @returns {boolean}
   */
  hasComponents() {
    return !!this._json.components;
  }

  /**
   * @returns {Components}
   */
  components() {
    if (!this._json.components) return null;
    return new Components(this._json.components);
  }

  /**
   * @returns {boolean}
   */
  hasTags() {
    return !!(this._json.tags && this._json.tags.length);
  }

  /**
   * @returns {Tag[]}
   */
  tags() {
    if (!this._json.tags) return [];
    return this._json.tags.map(t => new Tag(t));
  }

  /**
   * @returns {Message[]}
   */
  allMessages() {
    const messages = {};
    
    if (this.hasChannels()) {
      this.channelNames().forEach(channelName => {
        const channel = this.channel(channelName);
        if (channel.hasPublish()) {
          channel.publish().messages().forEach(m => {
            messages[m.name() || m.ext('x-parser-message-name')] = m;
          });
        }
        if (channel.hasSubscribe()) {
          channel.subscribe().messages().forEach(m => {
            messages[m.name() || m.ext('x-parser-message-name')] = m;
          });
        }
      });
    }

    if (this.hasComponents()) {
      Object.values(this.components().messages()).forEach(m => {
        messages[m.name() || m.ext('x-parser-message-name')] = m;
      });
    }
    
    return messages;
  }
}

function assignNameToAnonymousMessages(doc) {
  let anonymousMessageCounter = 0;

  if (doc.hasChannels()) {
    doc.channelNames().forEach(channelName => {
      const channel = doc.channel(channelName);
      if (channel.hasPublish()) {
        channel.publish().messages().forEach(m => {
          if (m.name() === undefined) {
            m.json()['x-parser-message-name'] = `<anonymous-message-${++anonymousMessageCounter}>`;
          }
        });
      }
      if (channel.hasSubscribe()) {
        channel.subscribe().messages().forEach(m => {
          if (m.name() === undefined) {
            m.json()['x-parser-message-name'] = `<anonymous-message-${++anonymousMessageCounter}>`;
          }
        });
      }
    });
  }

  if (doc.hasComponents()) {
    Object.values(doc.components().messages()).forEach(m => {
      if (m.name() === undefined) {
        m.json()['x-parser-message-name'] = `<anonymous-message-${++anonymousMessageCounter}>`;
      }
    });
  }
}

module.exports = addExtensions(AsyncAPIDocument);
