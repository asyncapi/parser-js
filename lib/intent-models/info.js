
const Base = require('../models/Base');
const MixinSpecificationExtensions = require('../intent-mixins/specification-extensions');
const MixinDescription = require('../intent-mixins/description');

/**
 * 
 * @class
 * @alias module:@asyncapi/parser#IntentInfo
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 */
class IntentInfo extends Base {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  title() {
    return this.title;
  }
  
  /**
   * @returns {string}
   */
  version() {
    return this.version;
  }
}

module.exports = mix(IntentInfo, MixinDescription, MixinSpecificationExtensions)
