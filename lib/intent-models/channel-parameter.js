
const ChannelParameterBase = require('../models/channel-parameter');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentChannelParameter
 * @extends ChannelParameterBase
 */
class IntentChannelParameter extends ChannelParameterBase {
    constructor() {
        super({
            schema: {
                properties: ['foo'],  
            },
        });
    }
    /**
     * 
     * @returns {string}
     */
    name() { return 'param name'; }    
}

module.exports = IntentChannelParameter;