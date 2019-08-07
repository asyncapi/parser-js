const Base = require('./base');
const Tag = require('./tag');
const ExternalDocs = require('./external-docs');
const Message = require('./message');

class Operation extends Base {
  summary() {
    return this._json.summary;
  }
  
  description() {
    return this._json.description;
  }
  
  id() {
    return this._json.operationId;
  }
  
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
  }
  
  tags() {
    if (!this._json.tags) return [];
    return this._json.tags.map(t => new Tag(t));
  }
  
  bindings() {
    return this._json.protocolInfo || null;
  }
  
  binding(name) {
    return this._json.protocolInfo ? this._json.protocolInfo[name] : null;
  }
  
  messages() {
    if (!this._json.message) return [];
    if (this._json.message.oneOf) return this._json.message.oneOf.map(m => new Message(m));
    return [new Message(this._json.message)];
  }
}

module.exports = Operation;
