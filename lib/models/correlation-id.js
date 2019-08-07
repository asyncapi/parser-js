const Base = require('./base');

class CorrelationId extends Base {
  description() {
    return this._json.description;
  }

  location() {
    return this._json.location;
  }
}

module.exports = CorrelationId;
