const Base = require('./base');

class Contact extends Base {
  name() {
    return this._json.name;
  }
  
  url() {
    return this._json.url;
  }
  
  email() {
    return this._json.email;
  }
}

module.exports = Contact;
