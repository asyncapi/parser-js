const Operation = require('./operation');

class SubscribeOperation extends Operation {
  isPublish() {
    return false;
  }
  
  isSubscribe() {
    return true;
  }

  kind() {
    return 'subscribe';
  }
}

module.exports = SubscribeOperation;
