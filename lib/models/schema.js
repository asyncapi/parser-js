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
   * @returns {string} uid
   */
  uid() {
    return this.$id() || this.ext('x-parser-schema-id');
  }
  
  /**
   * @returns {string} $id
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
   * @returns {number} exclusive maximum
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
   * @returns {number} exclusive minimum
   */
  exclusiveMinimum() {
    return this._json.exclusiveMinimum;
  }
  
  /**
   * @returns {number} maximum length
   */
  maxLength() {
    return this._json.maxLength;
  }
  
  /**
   * @returns {number} minimum length
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
   * @returns {number} maximum items
   */
  maxItems() {
    return this._json.maxItems;
  }
  
  /**
   * @returns {number} minimum items
   */
  minItems() {
    return this._json.minItems;
  }
  
  /**
   * @returns {boolean} true if contains unique items, otherwise false
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
   * @returns {Schema[]} allOf Schema
   */
  allOf() {
    if (!this._json.allOf) return null;
    return this._json.allOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]} oneOf Schema
   */
  oneOf() {
    if (!this._json.oneOf) return null;
    return this._json.oneOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]} anyOf Schema
   */
  anyOf() {
    if (!this._json.anyOf) return null;
    return this._json.anyOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema} not Schema
   */
  not() {
    if (!this._json.not) return null;
    return new Schema(this._json.not);
  }
  
  /**
   * @returns {Schema|Schema[]} items Schema
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
   * @returns {Schema} properties for the provided name
   */
  property(name) {
    return getMapValueOfType(this._json.properties, name, Schema);
  }
  
  /**
   * @returns {boolean|Schema} additionalProperties Schema or truth value
   */
  additionalProperties() {
    const ap = this._json.additionalProperties;
    if (ap === undefined || ap === null) return;
    if (typeof ap === 'boolean') return ap;
    return new Schema(ap);
  }
  
  /**
   * @returns {Schema} additionalItems Schema
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
   * @returns {Schema} contains Schema
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
   * @returns {Schema} propertyNames Schema
   */
  propertyNames() {
    if (!this._json.propertyNames) return null;
    return new Schema(this._json.propertyNames);
  }

  /**
   * @returns {Schema} if Schema
   */
  if() {
    if (!this._json.if) return null;
    return new Schema(this._json.if);
  }

  /**
   * @returns {Schema} then Schema
   */
  then() {
    if (!this._json.then) return null;
    return new Schema(this._json.then);
  }

  /**
   * @returns {Schema} else Schema
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
   * @returns {boolean} deprecated truth value
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
   * @returns {boolean} true if contains readOnly, otherwise false
   */
  readOnly() {
    return !!this._json.readOnly;
  }

  /**
   * @returns {boolean} true if contains writeOnly, otherwise false
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
   * @returns {boolean} true if Circular, otherwise false
   */
  isCircular() {
    return !!this.ext('x-parser-circular');
  }

  /**
   * @returns {boolean} true if has circular props, otherwise false
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
