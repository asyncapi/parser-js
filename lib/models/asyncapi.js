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
    assignIdToAnonymousSchemas(this);

    assignNameToComponentMessages(this);
    assignUidToComponentSchemas(this);
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
   * @returns {Map<Message>}
   */
  allMessages() {
    const messages = new Map();

    if (this.hasChannels()) {
      this.channelNames().forEach(channelName => {
        const channel = this.channel(channelName);
        if (channel.hasPublish()) {
          channel.publish().messages().forEach(m => {
            messages.set(m.uid(), m);
          });
        }
        if (channel.hasSubscribe()) {
          channel.subscribe().messages().forEach(m => {
            messages.set(m.uid(), m);
          });
        }
      });
    }

    if (this.hasComponents()) {
      Object.values(this.components().messages()).forEach(m => {
        messages.set(m.uid(), m);
      });
    }

    return messages;
  }

  /**
   * @returns {Map<Schema>}
   */
  allSchemas() {
    var schemas = new Map();

    if (this.hasChannels()) {
      this.channelNames().forEach(channelName => {
        const channel = this.channel(channelName);

        Object.values(channel.parameters()).forEach(p => {
          if (p.schema()) {
            schemas = findMoreSchemasIn(schemas, p.schema());
          }
        });

        if (channel.hasPublish()) {
          channel.publish().messages().forEach(m => {
            if (m.headers()) {
              schemas = findMoreSchemasIn(schemas, m.headers());
            }

            if (m.payload()) {
              schemas = findMoreSchemasIn(schemas, m.payload());
            }
          });
        }
        if (channel.hasSubscribe()) {
          channel.subscribe().messages().forEach(m => {
            if (m.headers()) {
              schemas = findMoreSchemasIn(schemas, m.headers());
            }

            if (m.payload()) {
              schemas = findMoreSchemasIn(schemas, m.payload());
            }
          });
        }
      });
    }

    if (this.hasComponents()) {
      Object.values(this.components().schemas()).forEach(s => {
        schemas = findMoreSchemasIn(schemas, s);
      });
    }

    return schemas;
  }
}
function findMoreSchemasIn(currentSchemas, schemaToSearch) {
  currentSchemas.set(schemaToSearch.uid(), schemaToSearch);
  const recursiveSchemas = recursiveSchemaFinder(schemaToSearch);
  return new Map([...currentSchemas, ...recursiveSchemas]);
}
function recursiveSchemaFinder(schema) {
  var schemas = new Map();
  switch (schema.type()) {
    case 'object':
      let props = schema.properties();
      for (const [_, propertySchema] of Object.entries(props)) {
        findMoreSchemasIn(schemas, propertySchema);
      }
      break;
    case 'array':
      if (Array.isArray(schema.items())) {
        Object.values(schema.items()).forEach(arraySchema => {
          findMoreSchemasIn(schemas, arraySchema);
        });
      } else {
        findMoreSchemasIn(schemasschemas, schema.items());
      }
      break;
    default:
      schemas.set(schema.uid(), schema);
      break;
  }
  return schemas;
}
function assignNameToComponentMessages(doc) {
  if (doc.hasComponents()) {
    for (const [key, m] of Object.entries(doc.components().messages())) {
      if (m.name() === undefined) {
        m.json()['x-parser-message-name'] = key;
      }
    }
  }
}
function assignUidToComponentSchemas(doc) {
  if (doc.hasComponents()) {
    for (const [key, s] of Object.entries(doc.components().schemas())) {
      s.json()['x-parser-schema-id'] = key;
    }
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
}

function assignIdToAnonymousSchemas(doc) {
  let anonymousSchemaCounter = 0;

  if (doc.hasChannels()) {
    doc.channelNames().forEach(channelName => {
      const channel = doc.channel(channelName);

      Object.values(channel.parameters()).forEach(p => {
        if (p.schema() && !p.schema().$id()) {
          p.schema().json()['x-parser-schema-id'] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
        }
      });

      if (channel.hasPublish()) {
        channel.publish().messages().forEach(m => {
          if (m.headers() && !m.headers().$id()) {
            m.headers().json()['x-parser-schema-id'] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
          }

          if (m.payload() && !m.payload().$id()) {
            m.payload().json()['x-parser-schema-id'] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
          }
        });
      }
      if (channel.hasSubscribe()) {
        channel.subscribe().messages().forEach(m => {
          if (m.headers() && !m.headers().$id()) {
            m.headers().json()['x-parser-schema-id'] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
          }

          if (m.payload() && !m.payload().$id()) {
            m.payload().json()['x-parser-schema-id'] = `<anonymous-schema-${++anonymousSchemaCounter}>`;
          }
        });
      }
    });
  }
}

module.exports = addExtensions(AsyncAPIDocument);
