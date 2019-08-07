const Operation = require('./operation');

class PublishOperation extends Operation {
  isPublish() {
    return true;
  }
  
  isSubscribe() {
    return false;
  }

  kind() {
    return 'publish';
  }
}

module.exports = PublishOperation;
