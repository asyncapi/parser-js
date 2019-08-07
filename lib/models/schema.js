const Base = require('./base');

class Schema extends Base {
  description() {
    return this._json.description;
  }
  
  summary() {
    return this._json.summary;
  }
}

module.exports = Schema;
