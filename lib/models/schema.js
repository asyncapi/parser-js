const { createMapOfType, getMapValueOfType, mix } = require('./utils');

const Base = require('./base');

const {xParserCircle, xParserCircleProps} = require('../constants');
const MixinDescription = require('../mixins/description');
const MixinExternalDocs = require('../mixins/external-docs');
const MixinSpecificationExtensions = require('../mixins/specification-extensions');

/**
 * Implements functions to deal with a Schema object.
 * @class
 * @alias module:@asyncapi/parser#Schema
 * @extends Base
 * @mixes MixinDescription
 * @mixes MixinExternalDocs
 * @mixes MixinSpecificationExtensions
 * @returns {Schema}
 */
class Schema extends Base {
  /**
   * Instantiates a schema object
   *
   * @constructor
   * @param {any} json Schema definition
   * @param {Object=} options
   * @param {Schema=} options.parent Parent schema definition
   */
  constructor(json, options) {
    super(json);
    this.options = options || {};
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
    return this._json.allOf.map(s => new Schema(s, { parent: this }));
  }
  
  /**
   * @returns {Schema[]}
   */
  oneOf() {
    if (!this._json.oneOf) return null;
    return this._json.oneOf.map(s => new Schema(s, { parent: this }));
  }
  
  /**
   * @returns {Schema[]}
   */
  anyOf() {
    if (!this._json.anyOf) return null;
    return this._json.anyOf.map(s => new Schema(s, { parent: this }));
  }
  
  /**
   * @returns {Schema}
   */
  not() {
    if (!this._json.not) return null;
    return new Schema(this._json.not, { parent: this });
  }
  
  /**
   * @returns {Schema|Schema[]}
   */
  items() {
    if (!this._json.items) return null;
    if (Array.isArray(this._json.items)) {
      return this._json.items.map(s => new Schema(s, { parent: this }));
    }
    return new Schema(this._json.items, { parent: this });
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  properties() {
    return createMapOfType(this._json.properties, Schema, { parent: this });
  }

  /**
   * @param {string} name - Name of the property.
   * @returns {Schema}
   */
  property(name) {
    return getMapValueOfType(this._json.properties, name, Schema, { parent: this });
  }
  
  /**
   * @returns {boolean|Schema}
   */
  additionalProperties() {
    const ap = this._json.additionalProperties;
    if (ap === undefined || ap === null) return;
    if (typeof ap === 'boolean') return ap;
    return new Schema(ap, { parent: this });
  }
  
  /**
   * @returns {Schema}
   */
  additionalItems() {
    const ai = this._json.additionalItems;
    if (ai === undefined || ai === null) return;
    return new Schema(ai, { parent: this });
  }
  
  /**
   * @returns {Object<string, Schema>}
   */
  patternProperties() {
    return createMapOfType(this._json.patternProperties, Schema, { parent: this });
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
    return new Schema(this._json.contains, { parent: this });
  }

  /**
   * @returns {Object<string, Schema|string[]>}
   */
  dependencies() {
    if (!this._json.dependencies) return null;
    const result = {};
    Object.entries(this._json.dependencies).forEach(([key, value]) => {
      result[String(key)] = !Array.isArray(value) ? new Schema(value, { parent: this }) : value;
    });
    return result;
  }

  /**
   * @returns {Schema}
   */
  propertyNames() {
    if (!this._json.propertyNames) return null;
    return new Schema(this._json.propertyNames, { parent: this });
  }

  /**
   * @returns {Schema}
   */
  if() {
    if (!this._json.if) return null;
    return new Schema(this._json.if, { parent: this });
  }

  /**
   * @returns {Schema}
   */
  then() {
    if (!this._json.then) return null;
    return new Schema(this._json.then, { parent: this });
  }

  /**
   * @returns {Schema}
   */
  else() {
    if (!this._json.else) return null;
    return new Schema(this._json.else, { parent: this });
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
    return createMapOfType(this._json.definitions, Schema, { parent: this });
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
  isBooleanSchema() {
    return typeof this._json === 'boolean';
  }

  /**
   * @returns {boolean}
   */
  isCircular() {
    if (!!this.ext(xParserCircle)) {
      return true;
    }

    let parent = this.options.parent;
    while (parent) {
      if (parent._json === this._json) return true;
      parent = parent.options && parent.options.parent;
    }
    return false;
  }

  /**
   * @returns {Schema}
   */
  circularSchema() {
    let parent = this.options.parent;
    while (parent) {
      if (parent._json === this._json) return parent;
      parent = parent.options && parent.options.parent;
    }
  }

  /**
   * @deprecated
   * @returns {boolean}
   */
  hasCircularProps() {
    if (Array.isArray(this.ext(xParserCircleProps))) {
      return this.ext(xParserCircleProps).length > 0;
    }
    return Object.entries(this.properties() || {})
      .map(([propertyName, property]) => {
        if (property.isCircular()) return propertyName;
      })
      .filter(Boolean)
      .length > 0;
  }

  /**
   * @deprecated
   * @returns {string[]}
   */
  circularProps() {
    if (Array.isArray(this.ext(xParserCircleProps))) {
      return this.ext(xParserCircleProps);
    }
    return Object.entries(this.properties() || {})
      .map(([propertyName, property]) => {
        if (property.isCircular()) return propertyName;
      })
      .filter(Boolean);
  }
}

module.exports = mix(Schema, MixinDescription, MixinExternalDocs, MixinSpecificationExtensions);
