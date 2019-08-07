const Base = require('./base');

class ServerVariable extends Base {
  allowedValues() {
    return this._json.enum;
  }

  allows(name) {
    if (this._json.enum === undefined) return true;
    return this._json.enum.includes(name);
  }

  hasAllowedValues() {
    return this._json.enum !== undefined;
  }

  defaultValue() {
    return this._json.default;
  }

  hasDefaultValue() {
    return this._json.default !== undefined;
  }

  description() {
    return this._json.description;
  }

  examples() {
    return this._json.examples;
  }
}

module.exports = ServerVariable;
