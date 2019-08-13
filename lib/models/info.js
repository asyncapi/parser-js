const { addExtensions } = require('../utils');
const Base = require('./base');
const License = require('./license');
const Contact = require('./contact');

class Info extends Base {
  title() {
    return this._json.title;
  }
  
  version() {
    return this._json.version;
  }

  license() {
    return new License(this._json.license);
  }

  contact() {
    return new Contact(this._json.contact);
  }
}

module.exports = addExtensions(Info);
