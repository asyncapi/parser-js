const { createMapOfType, addExtensions } = require('../utils');
const Base = require('./base');
const ExternalDocs = require('./external-docs');

/**
 * Implements functions to deal with a Schema object.
 * @class
 * @extends Base
 * @returns {Schema}
 */
class Schema extends Base {
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
    return this._json.$id;
  }
  
  /**
   * @returns {number}
   */
  multipleOf() {
    return this._json.multipleOf;
  }
  
  /**
   * @returns {number}
   */
  maximum() {
    return this._json.maximum;
  }
  
  /**
   * @returns {number}
   */
  exclusiveMaximum() {
    return this._json.exclusiveMaximum;
  }
  
  /**
   * @returns {number}
   */
  minimum() {
    return this._json.minimum;
  }
  
  /**
   * @returns {number}
   */
  exclusiveMinimum() {
    return this._json.exclusiveMinimum;
  }
  
  /**
   * @returns {number}
   */
  maxLength() {
    return this._json.maxLength;
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
    return this._json.pattern;
  }
  
  /**
   * @returns {number}
   */
  maxItems() {
    return this._json.maxItems;
  }
  
  /**
   * @returns {number}
   */
  minItems() {
    return this._json.minItems;
  }
  
  /**
   * @returns {boolean}
   */
  uniqueItems() {
    return !!this._json.uniqueItems;
  }
  
  /**
   * @returns {number}
   */
  maxProperties() {
    return this._json.maxProperties;
  }
  
  /**
   * @returns {number}
   */
  minProperties() {
    return this._json.minProperties;
  }
  
  /**
   * @returns {string[]}
   */
  required() {
    return this._json.required;
  }
  
  /**
   * @returns {any[]}
   */
  enum() {
    return this._json.enum;
  }
  
  /**
   * @returns {string|string[]}
   */
  type() {
    return this._json.type;
  }
  
  /**
   * @returns {Schema[]}
   */
  allOf() {
    if (!this._json.allOf) return null;
    return this._json.allOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]}
   */
  oneOf() {
    if (!this._json.oneOf) return null;
    return this._json.oneOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema[]}
   */
  anyOf() {
    if (!this._json.anyOf) return null;
    return this._json.anyOf.map(s => new Schema(s));
  }
  
  /**
   * @returns {Schema}
   */
  not() {
    if (!this._json.not) return null;
    return new Schema(this._json.not);
  }
  
  /**
   * @returns {Schema|Schema[]}
   */
  items() {
    if (!this._json.items) return null;
    if (Array.isArray(this._json.items)) {
      return this._json.items.map(s => new Schema(s));
    }
    return new Schema(this._json.items);
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  properties() {
    return createMapOfType(this._json.properties, Schema);
  }
  
  /**
   * @returns {boolean|Schema}
   */
  additionalProperties() {
    const ap = this._json.additionalProperties;
    if (ap === undefined || ap === null) return;
    if (typeof ap === 'boolean') return ap;
    return new Schema(ap);
  }
  
  /**
   * @returns {Schema}
   */
  additionalItems() {
    const ai = this._json.additionalItems;
    if (ai === undefined || ai === null) return;
    return new Schema(ai);
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  patternProperties() {
    return createMapOfType(this._json.patternProperties, Schema);
  }

  /**
   * @returns {any}
   */
  const() {
    return this._json.const;
  }

  /**
   * @returns {Schema}
   */
  contains() {
    if (!this._json.contains) return null;
    return new Schema(this._json.contains);
  }

  /**
   * @returns {Object<string, Schema|string[]>}
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
   * @returns {Schema}
   */
  propertyNames() {
    if (!this._json.propertyNames) return null;
    return new Schema(this._json.propertyNames);
  }

  /**
   * @returns {Schema}
   */
  if() {
    if (!this._json.if) return null;
    return new Schema(this._json.if);
  }

  /**
   * @returns {Schema}
   */
  then() {
    if (!this._json.then) return null;
    return new Schema(this._json.then);
  }

  /**
   * @returns {Schema}
   */
  else() {
    if (!this._json.else) return null;
    return new Schema(this._json.else);
  }

  /**
   * @returns {string}
   */
  format() {
    return this._json.format;
  }

  /**
   * @returns {string}
   */
  contentEncoding() {
    return this._json.contentEncoding;
  }

  /**
   * @returns {string}
   */
  contentMediaType() {
    return this._json.contentMediaType;
  }

  /**
   * @returns {Object<string, Schema>}
   */
  definitions() {
    return createMapOfType(this._json.definitions, Schema);
  }

  /**
   * @returns {string}
   */
  description() {
    return this._json.description;
  }

  /**
   * @returns {string}
   */
  title() {
    return this._json.title;
  }

  /**
   * @returns {any}
   */
  default() {
    return this._json.default;
  }

  /**
   * @returns {boolean}
   */
  deprecated() {
    return this._json.deprecated;
  }

  /**
   * @returns {string}
   */
  discriminator() {
    return this._json.discriminator;
  }

  /**
   * @returns {ExternalDocs}
   */
  externalDocs() {
    if (!this._json.externalDocs) return null;
    return new ExternalDocs(this._json.externalDocs);
  }

  /**
   * @returns {boolean}
   */
  readOnly() {
    return !!this._json.readOnly;
  }

  /**
   * @returns {boolean}
   */
  writeOnly() {
    return !!this._json.writeOnly;
  }

  /**
   * @returns {any[]}
   */
  examples() {
    return this._json.examples;
  }

  /**
   * @returns {boolean}
   */
  isCircular() {
    return !!this.ext('x-parser-circular');
  }
}

module.exports = addExtensions(Schema);
