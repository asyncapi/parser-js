const { getMapKeyOfType } = require('../utils');
const Base = require('./base');
const Tag = require('./tag');
const ExternalDocs = require('./external-docs');
const Schema = require('./schema');
const CorrelationId = require('./correlation-id');

class Message extends Base {
  headers() {
    if (!this._json.headers) return null;
    return new Schema(this._json.headers);
  }

  header(name) {
    if (!this._json.headers) return null;
    return getMapKeyOfType(this._json.headers.properties, name, Schema);
  }

  payload() {
    if (!this._json.payload) return null;
    return new Schema(this._json.payload);
  }

  originalPayload() {
    return this._json['x-parser-original-payload'] || this.payload();
  }

  correlationId() {
    if (!this._json.correlationId) return null;
    return new CorrelationId(this._json.correlationId);
  }

  schemaFormat() {
    return 'application/schema+json;version=draft-07';
  }

  originalSchemaFormat() {
    return this._json['x-parser-original-schema-format'] || this.schemaFormat();
  }

  contentType() {
    return this._json.contentType;
  }

  name() {
    return this._json.name;
  }

  title() {
    return this._json.title;
  }
  
  summary() {
    return this._json.summary;
  }
  
  description() {
    return this._json.description;
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
  
  examples() {
    return this._json.examples;
  }
}

module.exports = Message;
