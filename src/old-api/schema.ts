import { SpecificationExtensionsModel, createMapOfType, getMapValue, description, hasDescription, hasExternalDocs, externalDocs } from './mixins';
import { xParserCircular, xParserCircularProps } from '../constants';

import type { Base } from './base';
import type { v2 } from '../spec-types';

export class Schema extends SpecificationExtensionsModel<v2.AsyncAPISchemaObject, { parent?: Schema }> {
  uid() {
    return this.$id() || this.ext('x-parser-schema-id');
  }

  $id() {
    return this.__get('$id');
  }

  multipleOf() {
    return this.__get('multipleOf');
  }

  maximum() {
    return this.__get('maximum');
  }

  exclusiveMaximum() {
    return this.__get('exclusiveMaximum');
  }

  minimum() {
    return this.__get('minimum');
  }

  exclusiveMinimum() {
    return this.__get('exclusiveMinimum');
  }

  maxLength() {
    return this.__get('maxLength');
  }

  minLength() {
    return this.__get('minLength');
  }

  pattern() {
    return this.__get('pattern');
  }

  maxItems() {
    return this.__get('maxItems');
  }

  minItems() {
    return this.__get('minItems');
  }

  uniqueItems() {
    return this.__get('uniqueItems');
  }

  maxProperties() {
    return this.__get('maxProperties');
  }

  minProperties() {
    return this.__get('minProperties');
  }

  required() {
    return this.__get('required');
  }

  enum() {
    return this.__get('enum');
  }

  type() {
    return this.__get('type');
  }

  allOf() {
    const allOf = this.__get('allOf');
    return !allOf ? null : allOf.map(this.__createChild);
  }

  oneOf() {
    const oneOf = this.__get('oneOf');
    return !oneOf ? null : oneOf.map(this.__createChild);
  }

  anyOf() {
    const anyOf = this.__get('anyOf');
    return !anyOf ? null : anyOf.map(this.__createChild);
  }

  not() {
    const not = this.__get('not');
    return !not ? null : this.__createChild(not);
  }

  items() {
    const items = this.__get('items');
    if (!items) return null;
    if (Array.isArray(items)) {
      return items.map(this.__createChild);
    }
    return this.__createChild(items);
  }

  properties() {
    return createMapOfType(this.__get('properties') as any, Schema, { parent: this });
  }

  property(name: string) {
    return getMapValue(this.__get('properties') as any, name, Schema, { parent: this });
  }

  additionalProperties() {
    const additionalProperties = this.__get('additionalProperties');
    if (typeof additionalProperties === 'boolean') return additionalProperties;
    if (additionalProperties === undefined || additionalProperties === null) return;
    return this.__createChild(additionalProperties);
  }

  additionalItems() {
    const additionalItems = this.__get('additionalItems');
    if (additionalItems === undefined || additionalItems === null) return;
    return this.__createChild(additionalItems);
  }

  patternProperties() {
    return createMapOfType(this.__get('patternProperties') as any, Schema, { parent: this });
  }

  const() {
    return this.__get('const');
  }

  contains() {
    const contains = this.__get('contains');
    return typeof contains === 'undefined' ? null : this.__createChild(contains);
  }

  dependencies() {
    const dependencies = this.__get('dependencies');
    if (!dependencies) return null;
    const result: Record<string, Schema | string[]> = {};
    Object.entries(dependencies).forEach(([key, value]) => {
      result[key] = !Array.isArray(value) ? this.__createChild(value) : value;
    });
    return result;
  }

  propertyNames() {
    const propertyNames = this.__get('propertyNames');
    return typeof propertyNames === 'undefined' ? null : this.__createChild(propertyNames);
  }

  if() {
    const _if = this.__get('if');
    return typeof _if === 'undefined' ? null : this.__createChild(_if);
  }

  then() {
    const _then = this.__get('then');
    return typeof _then === 'undefined' ? null : this.__createChild(_then);
  }

  else() {
    const _else = this.__get('else');
    return typeof _else === 'undefined' ? null : this.__createChild(_else);
  }

  format() {
    return this.__get('format');
  }

  contentEncoding() {
    return this.__get('contentEncoding');
  }

  contentMediaType() {
    return this.__get('contentMediaType');
  }

  definitions() {
    return createMapOfType(this.__get('definitions') as any, Schema, { parent: this });
  }

  title() {
    return this.__get('title');
  }

  default() {
    return this.__get('default');
  }

  deprecated() {
    return this.__get('deprecated');
  }

  discriminator() {
    return this.__get('discriminator');
  }

  readOnly() {
    return this.__get('readOnly');
  }

  writeOnly() {
    return this.__get('writeOnly');
  }

  examples() {
    return this.__get('examples');
  }

  isBooleanSchema() {
    return typeof this._json === 'boolean';
  }

  description() {
    return description(this as Base);
  }

  hasDescription() {
    return hasDescription(this as Base);
  }

  externalDocs() {
    return externalDocs(this as Base);
  }

  hasExternalDocs() {
    return hasExternalDocs(this as Base);
  }

  isCircular() {
    if (this.ext(xParserCircular)) {
      return true;
    }

    let parent = this._meta.parent;
    while (parent) {
      if (parent._json === this._json) return true;
      parent = parent._meta && parent._meta.parent;
    }
    return false;
  }

  circularSchema() {
    let parent = this._meta.parent;
    while (parent) {
      if (parent._json === this._json) return parent;
      parent = parent._meta && parent._meta.parent;
    }
  }

  hasCircularProps() {
    if (Array.isArray(this.ext(xParserCircularProps))) {
      return this.ext(xParserCircularProps).length > 0;
    }
    return Object.entries(this.properties() || {})
      .map(([propertyName, property]) => {
        if (property.isCircular()) return propertyName;
      })
      .filter(Boolean)
      .length > 0;
  }

  circularProps() {
    if (Array.isArray(this.ext(xParserCircularProps))) {
      return this.ext(xParserCircularProps);
    }
    return Object.entries(this.properties() || {})
      .map(([propertyName, property]) => {
        if (property.isCircular()) return propertyName;
      })
      .filter(Boolean);
  }

  protected __get<K extends keyof v2.AsyncAPISchemaDefinition>(key: K): v2.AsyncAPISchemaDefinition[K] | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json[key];
  }

  protected __createChild(s: v2.AsyncAPISchemaObject) {
    return new Schema(s as any, { parent: this });
  }
}