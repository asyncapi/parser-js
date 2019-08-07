const Base = require('./base');

class ExternalDocs extends Base {
  description() {
    return this._json.description;
  }
  
  url() {
    return this._json.url;
  }
}

module.exports = ExternalDocs;
