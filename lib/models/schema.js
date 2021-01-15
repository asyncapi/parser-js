const { createMapOfType, getMapValueOfType, mix } = require('../utils');

const Base = require('./base');

const MixinDescription = require('../mixins/description');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Schema object.
 * 
 * @class
 * @alias module:@asyncapi/parser#Schema
 * @augments Base
 * @mixes MixinDescription
 * @mixes MixinExternalDocs
 * @mixes MixinSpecificationExtensions
 * @returns {Schema}
 */
class Schema extends Base {
  /**
   * @returns {string} The uid
   */
  uid() {
    return this.$id() || this.ext('x-parser-schema-id');
  }
  
  /**
   * @returns {string} The $id
   */
  $id() {
    return this._json.$id;
  }
  
  /**
   * @returns {number} multipleOf
   */
  multipleOf() {
    return this._json.multipleOf;
  }
  
  /**
   * @returns {number} maximum
   */
  maximum() {
    return this._json.maximum;
  }
  
  /**
   * @returns {number} exclusiveMaximum
   */
  exclusiveMaximum() {
    return this._json.exclusiveMaximum;
  }
  
  /**
   * @returns {number} minimum
   */
  minimum() {
    return this._json.minimum;
  }
  
  /**
   * @returns {number} exclusiveMinimum
   */
  exclusiveMinimum() {
    return this._json.exclusiveMinimum;
  }
  
  /**
   * @returns {number} maxLength
   */
  maxLength() {
    return this._json.maxLength;
  }
  
  /**
   * @returns {number} minLength
   */
  minLength() {
    return this._json.minLength;
  }
  
  /**
   * @returns {string} pattern
   */
  pattern() {
    return this._json.pattern;
  }
  
  /**
   * @returns {number} maxItems
   */
  maxItems() {
    return this._json.maxItems;
  }
  
  /**
   * @returns {number} minItems
   */
  minItems() {
    return this._json.minItems;
  }
  
  /**
   * @returns {boolean} uniqueItems
   */
  uniqueItems() {
    return !!this._json.uniqueItems;
  }
  
  /**
   * @returns {number} maxProperties
   */
  maxProperties() {
    return this._json.maxProperties;
  }
  
  /**
   * @returns {number} minProperties
   */
  minProperties() {
    return this._json.minProperties;
  }
  
  /**
   * @returns {string[]} required
   */
  required() {
    return this._json.required;
  }
  
  /**
   * @returns {any[]} enum
   */
  enum() {
    return this._json.enum;
  }
  
  /**
   * @returns {string|string[]} type
   */
  type() {
    return this._json.type;
  }
  
  /**
   * @returns {Schema[]} allOf
   */
  allOf() {
    if (!this._json.allOf) return null;
    return this._json.allOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]} oneOf
   */
  oneOf() {
    if (!this._json.oneOf) return null;
    return this._json.oneOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]} anyOf
   */
  anyOf() {
    if (!this._json.anyOf) return null;
    return this._json.anyOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema} not
   */
  not() {
    if (!this._json.not) return null;
    return new Schema(this._json.not);
  }
  
  /**
   * @returns {Schema|Schema[]} items 
   */
  items() {
    if (!this._json.items) return null;
    if (Array.isArray(this._json.items)) {
      return this._json.items.map(s => new Schema(s));
    }
    return new Schema(this._json.items);
  }
  
  /**
   * @returns {object<string, Schema>} properties
   */
  properties() {
    return createMapOfType(this._json.properties, Schema);
  }

  /**
   * @param {string} name - Name of the property.
   * @returns {Schema} the property
   */
  property(name) {
    return getMapValueOfType(this._json.properties, name, Schema);
  }
  
  /**
   * @returns {boolean|Schema} additionalProperties
   */
  additionalProperties() {
    const ap = this._json.additionalProperties;
    if (ap === undefined || ap === null) return;
    if (typeof ap === 'boolean') return ap;
    return new Schema(ap);
  }
  
  /**
   * @returns {Schema} additionalItems
   */
  additionalItems() {
    const ai = this._json.additionalItems;
    if (ai === undefined || ai === null) return;
    return new Schema(ai);
  }
  
  /**
   * @returns {object<string, Schema>} patternProperties
   */
  patternProperties() {
    return createMapOfType(this._json.patternProperties, Schema);
  }

  /**
   * @returns {any} const
   */
  const() {
    return this._json.const;
  }

  /**
   * @returns {Schema} contains
   */
  contains() {
    if (!this._json.contains) return null;
    return new Schema(this._json.contains);
  }

  /**
   * @returns {object<string, Schema|string[]>} dependencies
   */
  dependencies() {
    if (!this._json.dependencies) return null;
    const result = {};
    Object.entries(this._json.dependencies).forEach(([key, value]) => {
      result[String(key)] = !Array.isArray(value) ? new Schema(value) : value;
    });
    return result;
  }

  /**
   * @returns {Schema} propertyNames
   */
  propertyNames() {
    if (!this._json.propertyNames) return null;
    return new Schema(this._json.propertyNames);
  }

  /**
   * @returns {Schema} if
   */
  if() {
    if (!this._json.if) return null;
    return new Schema(this._json.if);
  }

  /**
   * @returns {Schema} then
   */
  then() {
    if (!this._json.then) return null;
    return new Schema(this._json.then);
  }

  /**
   * @returns {Schema} else
   */
  else() {
    if (!this._json.else) return null;
    return new Schema(this._json.else);
  }

  /**
   * @returns {string} format
   */
  format() {
    return this._json.format;
  }

  /**
   * @returns {string} contentEncoding
   */
  contentEncoding() {
    return this._json.contentEncoding;
  }

  /**
   * @returns {string} contentMediaType
   */
  contentMediaType() {
    return this._json.contentMediaType;
  }

  /**
   * @returns {object<string, Schema>} definitions
   */
  definitions() {
    return createMapOfType(this._json.definitions, Schema);
  }

  /**
   * @returns {string} title
   */
  title() {
    return this._json.title;
  }

  /**
   * @returns {any} default
   */
  default() {
    return this._json.default;
  }

  /**
   * @returns {boolean} deprecated
   */
  deprecated() {
    return this._json.deprecated;
  }

  /**
   * @returns {string} discriminator
   */
  discriminator() {
    return this._json.discriminator;
  }
  /**
   * @returns {boolean} readOnly
   */
  readOnly() {
    return !!this._json.readOnly;
  }

  /**
   * @returns {boolean} writeOnly
   */
  writeOnly() {
    return !!this._json.writeOnly;
  }

  /**
   * @returns {any[]} examples
   */
  examples() {
    return this._json.examples;
  }

  /**
   * @returns {boolean} isCircular
   */
  isCircular() {
    return !!this.ext('x-parser-circular');
  }

  /**
   * @returns {boolean} hasCircularProps
   */
  hasCircularProps() {
    return !!this.ext('x-parser-circular-props');
  }

  /**
   * @returns {string[]} circularProps
   */
  circularProps() {
    return this.ext('x-parser-circular-props');
  }
}

module.exports = mix(Schema, MixinDescription, MixinExternalDocs, MixinSpecificationExtensions);
