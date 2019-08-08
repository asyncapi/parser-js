const Base = require('./base');

class Schema extends Base {
  multipleOf() {
    return this._json.multipleOf;
  }
  
  maximum() {
    return this._json.maximum;
  }
  
  exclusiveMaximum() {
    return this._json.exclusiveMaximum;
  }
  
  minimum() {
    return this._json.minimum;
  }
  
  exclusiveMinimum() {
    return this._json.exclusiveMinimum;
  }
  
  maxLength() {
    return this._json.maxLength;
  }
  
  minLength() {
    return this._json.minLength;
  }
  
  pattern() {
    return this._json.pattern;
  }
  
  maxItems() {
    return this._json.maxItems;
  }
  
  minItems() {
    return this._json.minItems;
  }
  
  uniqueItems() {
    return !!this._json.uniqueItems;
  }
  
  maxProperties() {
    return this._json.maxProperties;
  }
  
  minProperties() {
    return this._json.minProperties;
  }
  
  required() {
    return this._json.required;
  }
  
  enum() {
    return this._json.enum;
  }
  
  type() {
    return this._json.type;
  }
  
  allOf() {
    if (!this._json.allOf) return null;
    return this._json.allOf.map(s => new Schema(s));
  }
  
  oneOf() {
    if (!this._json.oneOf) return null;
    return this._json.oneOf.map(s => new Schema(s));
  }
  
  anyOf() {
    if (!this._json.anyOf) return null;
    return this._json.anyOf.map(s => new Schema(s));
  }
  
  not() {
    if (!this._json.not) return null;
    return new Schema(this._json.not);
  }
  
  items() {
    if (!this._json.items) return null;
    if (Array.isArray(this._json.items)) {
      return this._json.items.map(s => new Schema(s));
    }
    return new Schema(this._json.items);
  }
  
  properties() {
    if (!this._json.properties) return null;
    const result = {};
    Object.keys(this._json.properties).forEach(k => {
      result[k] = new Schema(this._json.properties[k]);
    });
    return result;
  }
  
  additionalProperties() {
    const ap = this._json.additionalProperties;
    if (ap === undefined || ap === null) return null;
    if (typeof ap === 'boolean') return ap;
    return new Schema(ap);
  }
  
  patternProperties() {
    if (!this._json.patternProperties) return null;
    const result = {};
    Object.keys(this._json.patternProperties).map(k => {
      result[k] = new Schema(this._json.patternProperties[k]);
    });
    return result;
  }

  const() {
    return this._json.const;
  }

  contains() {
    if (!this._json.contains) return null;
    return new Schema(this._json.contains);
  }

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

  propertyNames() {
    if (!this._json.propertyNames) return null;
    return new Schema(this._json.propertyNames);
  }

  if() {
    if (!this._json.if) return null;
    return new Schema(this._json.if);
  }

  then() {
    if (!this._json.then) return null;
    return new Schema(this._json.then);
  }

  else() {
    if (!this._json.else) return null;
    return new Schema(this._json.else);
  }

  format() {
    return this._json.format;
  }

  contentEncoding() {
    return this._json.contentEncoding;
  }

  contentMediaType() {
    return this._json.contentMediaType;
  }

  definitions() {
    if (!this._json.definitions) return null;
    const result = {};
    Object.keys(this._json.definitions).map(k => {
      result[k] = new Schema(this._json.definitions[k]);
    });
    return result;
  }

  description() {
    return this._json.description;
  }

  title() {
    return this._json.title;
  }

  default() {
    return this._json.default;
  }

  readOnly() {
    return !!this._json.readOnly;
  }

  writeOnly() {
    return !!this._json.writeOnly;
  }

  examples() {
    return this._json.examples;
  }
}

module.exports = Schema;
