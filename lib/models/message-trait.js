const { addExtensions } = require('../utils');
const MessageTraitable = require('./message-traitable');

/**
 * Implements functions to deal with a MessageTrait object.
 * @class
 * @alias module:@asyncapi/parser#MessageTrait
 * @extends Base
 * @returns {MessageTrait}
 */
class MessageTrait extends MessageTraitable {
}

module.exports = addExtensions(MessageTrait);
