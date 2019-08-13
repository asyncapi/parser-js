const { createMapOfType, getMapKeyOfType, addExtensions } = require('../utils');
const Base = require('./base');
const ServerVariable = require('./server-variable');
const ServerSecurityRequirement = require('./server-security-requirement');

class Server extends Base {
  description() {
    return this._json.description;
  }

  url() {
    return this._json.url;
  }

  protocol() {
    return this._json.protocol;
  }

  protocolVersion() {
    return this._json.protocolVersion;
  }

  variables() {
    return createMapOfType(this._json.variables, ServerVariable);
  }

  variable(name) {
    return getMapKeyOfType(this._json.variables, name, ServerVariable);
  }

  security() {
    if (!this._json.security) return null;
    return this._json.security.map(sec => new ServerSecurityRequirement(sec));
  }
}

module.exports = addExtensions(Server);
