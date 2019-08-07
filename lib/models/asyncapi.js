const { createMapOfType, getMapKeyOfType } = require('../utils');
const Base = require('./base');
const Info = require('./info');
const Server = require('./server');
const Channel = require('./channel');

class AsyncAPIDocument extends Base {
  info() {
    return new Info(this._json.info);
  }
  
  id() {
    return this._json.id;
  }

  servers() {
    return createMapOfType(this._json.servers, Server);
  }

  server(name) {
    return getMapKeyOfType(this._json.servers, name, Server);
  }

  channels() {
    return createMapOfType(this._json.channels, Channel, this);
  }
  
  channel(name) {
    return getMapKeyOfType(this._json.channels, name, Channel, this);
  }

  defaultContentType() {
    return this._json.defaultContentType || null;
  }
}

module.exports = AsyncAPIDocument;
