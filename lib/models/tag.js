const Base = require('./base');
const ExternalDocs = require('./external-docs');

class Tag extends Base {
  name() {
    return this._json.name;
  }
  
  description() {
    return this._json.description;
  }
  
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
  }
}

module.exports = Tag;
