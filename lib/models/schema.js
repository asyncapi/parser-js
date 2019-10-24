const { addExtensions } = require('../utils');
const Base = require('./base');

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
   * @returns {string}
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
    if (!this._json.properties) return null;
    const result = {};
    Object.keys(this._json.properties).forEach(k => {
      result[k] = new Schema(this._json.properties[k]);
    });
    return result;
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
    if (!this._json.patternProperties) return null;
    const result = {};
    Object.keys(this._json.patternProperties).map(k => {
      result[k] = new Schema(this._json.patternProperties[k]);
    });
    return result;
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
    Object.keys(this._json.dependencies).forEach(k => {
      if (!Array.isArray(this._json.dependencies[k])) {
        result[k] = new Schema(this._json.dependencies[k]);
      } else {
        result[k] = this._json.dependencies[k];
      }
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
    if (!this._json.definitions) return null;
    const result = {};
    Object.keys(this._json.definitions).map(k => {
      result[k] = new Schema(this._json.definitions[k]);
    });
    return result;
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
}

module.exports = addExtensions(Schema);
