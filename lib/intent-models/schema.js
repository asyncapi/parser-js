const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const IntentBase = require('./base');

const MixinDescription = require('../intent-mixins/description');
// const MixinExternalDocs = require('../intent-mixins/external-docs'); // TODO
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Schema object.
 * @class
 * @alias module:@asyncapi/parser#Schema
 * @extends IntentBase
 * @mixes MixinDescription
 * @mixes MixinSpecificationExtensions
 * @returns {Schema}
 */
class Schema extends IntentBase {
  constructor(...args) {
    super(...args);
  }
  /**
   * @returns {string}
   */
  uid() {
    return this.$id() || this.ext('x-parser-schema-id');
  }
  
  /**
   * @returns {string}
   */
  $id() {
    return this.$id;
  }
  
  /**
   * @returns {number}
   */
  multipleOf() {
    return this.multipleOf;
  }
  
  /**
   * @returns {number}
   */
  maximum() {
    return this.maximum;
  }
  
  /**
   * @returns {number}
   */
  exclusiveMaximum() {
    return this.exclusiveMaximum;
  }
  
  /**
   * @returns {number}
   */
  minimum() {
    return this.minimum;
  }
  
  /**
   * @returns {number}
   */
  exclusiveMinimum() {
    return this.exclusiveMinimum;
  }
  
  /**
   * @returns {number}
   */
  maxLength() {
    return this.maxLength;
  }
  
  /**
   * @returns {number}
   */
  minLength() {
    return this._json.minLength;
  }
  
  /**
   * @returns {string}
   */
  pattern() {
    return this.pattern;
  }
  
  /**
   * @returns {number}
   */
  maxItems() {
    return this.maxItems;
  }
  
  /**
   * @returns {number}
   */
  minItems() {
    return this.minItems;
  }
  
  /**
   * @returns {boolean}
   */
  uniqueItems() {
    return !!this.uniqueItems;
  }
  
  /**
   * @returns {number}
   */
  maxProperties() {
    return this.maxProperties;
  }
  
  /**
   * @returns {number}
   */
  minProperties() {
    return this.minProperties;
  }
  
  /**
   * @returns {string[]}
   */
  required() {
    return this.required;
  }
  
  /**
   * @returns {any[]}
   */
  enum() {
    return this.enum;
  }
  
  /**
   * @returns {string|string[]}
   */
  type() {
    return this.type;
  }
  
  /**
   * @returns {Schema[]}
   */
  allOf() {
    if (!this.allOf) return null;
    return this.allOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]}
   */
  oneOf() {
    if (!this.oneOf) return null;
    return this.oneOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]}
   */
  anyOf() {
    if (!this.anyOf) return null;
    return this.anyOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema}
   */
  not() {
    if (!this.not) return null;
    return new Schema(this.not);
  }
  
  /**
   * @returns {Schema|Schema[]}
   */
  items() {
    if (!this.items) return null;
    if (Array.isArray(this.items)) {
      return this.items.map(s => new Schema(s));
    }
    return new Schema(this.items);
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  properties() {
    return createMapOfType(this.properties, Schema);
  }

  /**
   * @param {string} name - Name of the property.
   * @returns {Schema}
   */
  property(name) {
    return getMapValueOfType(this.properties, name, Schema);
  }
  
  /**
   * @returns {boolean|Schema}
   */
  additionalProperties() {
    const ap = this.additionalProperties;
    if (ap === undefined || ap === null) return;
    if (typeof ap === 'boolean') return ap;
    return new Schema(ap);
  }
  
  /**
   * @returns {Schema}
   */
  additionalItems() {
    const ai = this.additionalItems;
    if (ai === undefined || ai === null) return;
    return new Schema(ai);
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  patternProperties() {
    return createMapOfType(this.patternProperties, Schema);
  }

  /**
   * @returns {any}
   */
  const() {
    return this.const;
  }

  /**
   * @returns {Schema}
   */
  contains() {
    if (!this.contains) return null;
    return new Schema(this.contains);
  }

  /**
   * @returns {Object<string, Schema|string[]>}
   */
  dependencies() {
    if (!this.dependencies) return null;
    const result = {};
    Object.entries(this.dependencies).forEach(([key, value]) => {
      result[String(key)] = !Array.isArray(value) ? new Schema(value) : value;
    });
    return result;
  }

  /**
   * @returns {Schema}
   */
  propertyNames() {
    if (!this.propertyNames) return null;
    return new Schema(this.propertyNames);
  }

  /**
   * @returns {Schema}
   */
  if() {
    if (!this.if) return null;
    return new Schema(this.if);
  }

  /**
   * @returns {Schema}
   */
  then() {
    if (!this.then) return null;
    return new Schema(this.then);
  }

  /**
   * @returns {Schema}
   */
  else() {
    if (!this.else) return null;
    return new Schema(this.else);
  }

  /**
   * @returns {string}
   */
  format() {
    return this.format;
  }

  /**
   * @returns {string}
   */
  contentEncoding() {
    return this.contentEncoding;
  }

  /**
   * @returns {string}
   */
  contentMediaType() {
    return this.contentMediaType;
  }

  /**
   * @returns {Object<string, Schema>}
   */
  definitions() {
    return createMapOfType(this.definitions, Schema);
  }

  /**
   * @returns {string}
   */
  title() {
    return this.title;
  }

  /**
   * @returns {any}
   */
  default() {
    return this.default;
  }

  /**
   * @returns {boolean}
   */
  deprecated() {
    return this.deprecated;
  }

  /**
   * @returns {string}
   */
  discriminator() {
    return this.discriminator;
  }
  /**
   * @returns {boolean}
   */
  readOnly() {
    return !!this.readOnly;
  }

  /**
   * @returns {boolean}
   */
  writeOnly() {
    return !!this.writeOnly;
  }

  /**
   * @returns {any[]}
   */
  examples() {
    return this.examples;
  }

  /**
   * @returns {boolean}
   */
  isCircular() {
    return !!this.ext('x-parser-circular');
  }

  /**
   * @returns {boolean}
   */
  hasCircularProps() {
    return !!this.ext('x-parser-circular-props');
  }

  /**
   * @returns {string[]}
   */
  circularProps() {
    return this.ext('x-parser-circular-props');
  }
}

module.exports = mix(Schema, MixinDescription, MixinSpecificationExtensions); // TODO add MixinExternalDocs
