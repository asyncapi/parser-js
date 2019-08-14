const { createMapOfType, getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');

/**
 * Contains handy methods to deal with the root AsyncAPI document.
 * @class
 * @extends Base
 * @returns {AsyncAPIDocument}
 */
class AsyncAPIDocument extends Base {
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
   * @returns {Server[]}
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
   * @returns {Channel[]}
   */
  channels() {
    return createMapOfType(this._json.channels, Channel, this);
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
}

module.exports = addExtensions(AsyncAPIDocument);
