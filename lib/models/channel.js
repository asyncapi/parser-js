const { createMapOfType, getMapKeyOfType } = require('../utils');
const Base = require('./base');
const ChannelParameter = require('./channel-parameter');
const PublishOperation = require('./publish-operation');
const SubscribeOperation = require('./subscribe-operation');

class Channel extends Base {
  description() {
    return this._json.description;
  }
  
  parameters() {
    return createMapOfType(this._json.parameters, ChannelParameter);
  }

  parameter(name) {
    return getMapKeyOfType(this._json.parameters, name, ChannelParameter);
  }

  publish() {
    if (!this._json.publish) return null;
    return new PublishOperation(this._json.publish);
  }

  subscribe() {
    if (!this._json.subscribe) return null;
    return new SubscribeOperation(this._json.subscribe);
  }

  hasPublish() {
    return !!this._json.publish;
  }

  hasSubscribe() {
    return !!this._json.subscribe;
  }
}

module.exports = Channel;
