import { BaseModel } from '../base';

import { xParserSchemaId } from '../../constants';
import { extensions, hasExternalDocs, externalDocs } from './mixins';
import { retrievePossibleRef, hasRef } from '../../utils';

import type { ModelMetadata } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { SchemaInterface } from '../schema';

import type { v2 } from '../../spec-types';

export class Schema extends BaseModel<v2.AsyncAPISchemaObject, { id?: string, parent?: Schema }> implements SchemaInterface {
  constructor(
    _json: v2.AsyncAPISchemaObject,
    _meta: ModelMetadata & { id?: string, parent?: Schema } = {} as any,
  ) {
    _json = retrievePossibleRef(_json, _meta.pointer, _meta.asyncapi?.parsed);
    super(_json, _meta);
  }

  id(): string {
    return this.$id() || this._meta.id || this.json(xParserSchemaId as any) as string;
  }

  $comment(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.$comment;
  }

  $id(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.$id;
  }

  $schema(): string {
    if (typeof this._json === 'boolean') return 'http://json-schema.org/draft-07/schema#';
    return this._json.$schema || 'http://json-schema.org/draft-07/schema#';
  }

  additionalItems(): boolean | SchemaInterface {
    if (typeof this._json === 'boolean') return this._json;
    if (typeof this._json.additionalItems === 'boolean') return this._json.additionalItems;
    if (this._json.additionalItems === undefined) return true;
    if (this._json.additionalItems === null) return false;
    return this.createModel(Schema, this._json.additionalItems, { pointer: `${this._meta.pointer}/additionalItems`, parent: this });
  }

  additionalProperties(): boolean | SchemaInterface {
    if (typeof this._json === 'boolean') return this._json;
    if (typeof this._json.additionalProperties === 'boolean') return this._json.additionalProperties;
    if (this._json.additionalProperties === undefined) return true;
    if (this._json.additionalProperties === null) return false;
    return this.createModel(Schema, this._json.additionalProperties, { pointer: `${this._meta.pointer}/additionalProperties`, parent: this });
  }

  allOf(): Array<SchemaInterface> | undefined {
    if (typeof this._json === 'boolean') return;
    if (!Array.isArray(this._json.allOf)) return undefined;
    return this._json.allOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/allOf/${index}`, parent: this }));
  }

  anyOf(): Array<SchemaInterface> | undefined {
    if (typeof this._json === 'boolean') return;
    if (!Array.isArray(this._json.anyOf)) return undefined;
    return this._json.anyOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/anyOf/${index}`, parent: this }));
  }

  const(): any {
    if (typeof this._json === 'boolean') return;
    return this._json.const;
  }

  contains(): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.contains !== 'object') return;
    return this.createModel(Schema, this._json.contains, { pointer: `${this._meta.pointer}/contains`, parent: this });
  }

  contentEncoding(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.contentEncoding;
  }

  contentMediaType(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.contentMediaType;
  }

  default(): any {
    if (typeof this._json === 'boolean') return;
    return this._json.default;
  }

  definitions(): Record<string, SchemaInterface> | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.definitions !== 'object') return;
    return Object.entries(this._json.definitions).reduce((acc: Record<string, SchemaInterface>, [key, s]: [string, any]) => {
      acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/definitions/${key}`, parent: this });
      return acc;
    }, {});
  }

  description(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.description;
  }

  dependencies(): Record<string, SchemaInterface | Array<string>> | undefined {
    if (typeof this._json === 'boolean') return;
    if (typeof this._json.dependencies !== 'object') return undefined;
    return Object.entries(this._json.dependencies).reduce((acc: Record<string, SchemaInterface | Array<string>>, [key, s]: [string, any]) => {
      acc[key] = Array.isArray(s) ? s : this.createModel(Schema, s, { pointer: `${this._meta.pointer}/dependencies/${key}`, parent: this });
      return acc;
    }, {});
  }

  deprecated(): boolean {
    if (typeof this._json === 'boolean') return false;
    return this._json.deprecated || false;
  }

  discriminator(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.discriminator;
  }

  else(): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.else !== 'object') return;
    return this.createModel(Schema, this._json.else, { pointer: `${this._meta.pointer}/else`, parent: this });
  }

  enum(): Array<any> | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.enum;
  }

  examples(): Array<any> | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.examples;
  }

  exclusiveMaximum(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.exclusiveMaximum;
  }

  exclusiveMinimum(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.exclusiveMinimum;
  }

  format(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.format;
  }

  isBooleanSchema(): boolean {
    return typeof this._json === 'boolean';
  }

  if(): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.if !== 'object') return;
    return this.createModel(Schema, this._json.if, { pointer: `${this._meta.pointer}/if`, parent: this });
  }

  isCircular(): boolean {
    if (hasRef(this._json)) return true;
    let parent = this._meta.parent;
    while (parent) {
      if (parent._json === this._json) return true;
      parent = parent._meta.parent;
    }
    return false;
  }

  items(): SchemaInterface | Array<SchemaInterface> | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.items !== 'object') return;
    if (Array.isArray(this._json.items)) {
      return this._json.items.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/items/${index}`, parent: this }));
    }
    return this.createModel(Schema, this._json.items, { pointer: `${this._meta.pointer}/items`, parent: this });
  }

  maximum(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.maximum;
  }

  maxItems(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.maxItems;
  }

  maxLength(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.maxLength;
  }

  maxProperties(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.maxProperties;
  }

  minimum(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.minimum;
  }

  minItems(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.minItems;
  }

  minLength(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.minLength;
  }

  minProperties(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.minProperties;
  }

  multipleOf(): number | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.multipleOf;
  }

  not(): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.not !== 'object') return;
    return this.createModel(Schema, this._json.not, { pointer: `${this._meta.pointer}/not`, parent: this });
  }

  oneOf(): Array<SchemaInterface> | undefined {
    if (typeof this._json === 'boolean') return;
    if (!Array.isArray(this._json.oneOf)) return undefined;
    return this._json.oneOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/oneOf/${index}`, parent: this }));
  }

  pattern(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.pattern;
  }

  patternProperties(): Record<string, SchemaInterface> | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.patternProperties !== 'object') return;
    return Object.entries(this._json.patternProperties).reduce((acc: Record<string, SchemaInterface>, [key, s]: [string, any]) => {
      acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/patternProperties/${key}`, parent: this });
      return acc;
    }, {});
  }

  properties(): Record<string, SchemaInterface> | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.properties !== 'object') return;
    return Object.entries(this._json.properties).reduce((acc: Record<string, SchemaInterface>, [key, s]: [string, any]) => {
      acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/properties/${key}`, parent: this });
      return acc;
    }, {});
  }

  property(name: string): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.properties !== 'object' || typeof this._json.properties[name] !== 'object') return;
    return this.createModel(Schema, this._json.properties[name], { pointer: `${this._meta.pointer}/properties/${name}`, parent: this });
  }

  propertyNames(): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.propertyNames !== 'object') return;
    return this.createModel(Schema, this._json.propertyNames, { pointer: `${this._meta.pointer}/propertyNames`, parent: this });
  }

  readOnly(): boolean | undefined {
    if (typeof this._json === 'boolean') return false;
    return this._json.readOnly || false;
  }

  required(): Array<string> | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.required;
  }

  then(): SchemaInterface | undefined {
    if (typeof this._json === 'boolean' || typeof this._json.then !== 'object') return;
    return this.createModel(Schema, this._json.then, { pointer: `${this._meta.pointer}/then`, parent: this });
  }

  title(): string | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.title;
  }

  type(): string | Array<string> | undefined {
    if (typeof this._json === 'boolean') return;
    return this._json.type;
  }

  uniqueItems(): boolean | undefined {
    if (typeof this._json === 'boolean') return false;
    return this._json.uniqueItems || false;
  }

  writeOnly(): boolean | undefined {
    if (typeof this._json === 'boolean') return false;
    return this._json.writeOnly || false;
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this as BaseModel<v2.AsyncAPISchemaDefinition>);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this as BaseModel<v2.AsyncAPISchemaDefinition>);
  }

  extensions(): ExtensionsInterface {
    return extensions(this as BaseModel<v2.AsyncAPISchemaDefinition>);
  }
}
