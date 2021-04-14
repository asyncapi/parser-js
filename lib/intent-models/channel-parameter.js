
const ChannelParameterBase = require('../models/channel-parameter');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannelParameter
 * @extends ChannelParameterBase
 */
class IntentChannelParameter extends ChannelParameterBase {
    /**
     * 
     * @returns {string}
     */
    name() { return 'param name'; }
}

module.exports = IntentChannelParameter;