const Base = require('./base');

class License extends Base {
  name() {
    return this._json.name;
  }
  
  url() {
    return this._json.url;
  }
}

module.exports = License;
