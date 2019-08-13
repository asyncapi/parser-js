const { addExtensions } = require('../utils');
const Base = require('./base');
const Schema = require('./schema');

class ChannelParameter extends Base {
  description() {
    return this._json.description;
  }
  
  location() {
    return this._json.location;
  }
  
  schema() {
    if (!this._json.schema) return null;
    return new Schema(this._json.schema);
  }
}

module.exports = addExtensions(ChannelParameter);
