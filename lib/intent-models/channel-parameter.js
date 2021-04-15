
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
                properties: {'this_is_a_number_property': { "type": "number" }},  
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