import { BaseModel, ModelMetadata } from '../base';

import { xParserSchemaId } from '../../constants';
import { extensions, hasExternalDocs, externalDocs } from './mixins';
import { getDefaultSchemaFormat } from '../../schema-parser';
import { AsyncAPISchemaObject } from 'spec-types/v3';

import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { SchemaInterface } from '../schema';

import type { v3 } from '../../spec-types';

export class Schema extends BaseModel<v3.MultiFormatSchemaObject, { id?: string, parent?: Schema }> implements SchemaInterface {
  private _schemaFormat: string;
  private _schemaObject: AsyncAPISchemaObject;

  // The following constructor is needed because, starting from AsyncAPI v3, schemas can be multi-format as well.
  constructor(
    protected readonly _json: v3.MultiFormatSchemaObject,
    protected readonly _meta: ModelMetadata & { id?: string, parent?: Schema } = {} as ModelMetadata & { id?: string, parent?: Schema },
  ) {
    super(_json, _meta);
    
    // Based on the shape of the JSON, we grab the data for the Schema from the root (Schema) or rather from `schema` field (MultiFormatSchema).
    if (typeof _json === 'object' && typeof _json.schema === 'object') {
      this._schemaObject = _json.schema;
      this._schemaFormat = _json.schemaFormat;
    } else {
      this._schemaObject = _json;
      this._schemaFormat = getDefaultSchemaFormat(_meta.asyncapi?.semver?.version);
    }
  }
  id(): string {
    return this.$id() || this._meta.id || (this._schemaObject as any)[xParserSchemaId] as string;
  }

  $comment(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.$comment;
  }

  $id(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.$id;
  }

  $schema(): string {
    if (typeof this._schemaObject === 'boolean') return 'http://json-schema.org/draft-07/schema#';
    return this._schemaObject.$schema ?? 'http://json-schema.org/draft-07/schema#';
  }

  additionalItems(): boolean | SchemaInterface {
    if (typeof this._schemaObject === 'boolean') return this._schemaObject;
    if (this._schemaObject.additionalItems === undefined) return true;
    if (typeof this._schemaObject.additionalItems === 'boolean') return this._schemaObject.additionalItems;
    return this.createModel(Schema, this._schemaObject.additionalItems, { pointer: `${this._meta.pointer}/additionalItems`, parent: this });
  }

  additionalProperties(): boolean | SchemaInterface {
    if (typeof this._schemaObject === 'boolean') return this._schemaObject;
    if (this._schemaObject.additionalProperties === undefined) return true;
    if (typeof this._schemaObject.additionalProperties === 'boolean') return this._schemaObject.additionalProperties;
    return this.createModel(Schema, this._schemaObject.additionalProperties, { pointer: `${this._meta.pointer}/additionalProperties`, parent: this });
  }

  allOf(): Array<SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    if (!Array.isArray(this._schemaObject.allOf)) return undefined;
    return this._schemaObject.allOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/allOf/${index}`, parent: this }));
  }

  anyOf(): Array<SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    if (!Array.isArray(this._schemaObject.anyOf)) return undefined;
    return this._schemaObject.anyOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/anyOf/${index}`, parent: this }));
  }

  const(): any {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.const;
  }

  contains(): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.contains !== 'object') return;
    return this.createModel(Schema, this._schemaObject.contains, { pointer: `${this._meta.pointer}/contains`, parent: this });
  }

  contentEncoding(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.contentEncoding;
  }

  contentMediaType(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.contentMediaType;
  }

  default(): any {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.default;
  }

  definitions(): Record<string, SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.definitions !== 'object') return;
    return Object.entries(this._schemaObject.definitions).reduce((acc: Record<string, SchemaInterface>, [key, s]: [string, any]) => {
      acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/definitions/${key}`, parent: this });
      return acc;
    }, {});
  }

  description(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.description;
  }

  dependencies(): Record<string, SchemaInterface | Array<string>> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    if (typeof this._schemaObject.dependencies !== 'object') return undefined;
    return Object.entries(this._schemaObject.dependencies).reduce((acc: Record<string, SchemaInterface | Array<string>>, [key, s]: [string, any]) => {
      acc[key] = Array.isArray(s) ? s : this.createModel(Schema, s, { pointer: `${this._meta.pointer}/dependencies/${key}`, parent: this });
      return acc;
    }, {});
  }

  deprecated(): boolean {
    if (typeof this._schemaObject === 'boolean') return false;
    return this._schemaObject.deprecated || false;
  }

  discriminator(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.discriminator;
  }

  else(): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.else !== 'object') return;
    return this.createModel(Schema, this._schemaObject.else, { pointer: `${this._meta.pointer}/else`, parent: this });
  }

  enum(): Array<any> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.enum;
  }

  examples(): Array<any> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.examples;
  }

  exclusiveMaximum(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.exclusiveMaximum;
  }

  exclusiveMinimum(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.exclusiveMinimum;
  }

  format(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.format;
  }

  isBooleanSchema(): boolean {
    return typeof this._schemaObject === 'boolean';
  }

  if(): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.if !== 'object') return;
    return this.createModel(Schema, this._schemaObject.if, { pointer: `${this._meta.pointer}/if`, parent: this });
  }

  isCircular(): boolean {
    let parent = this._meta.parent;
    while (parent) {
      if (parent._json === this._schemaObject) return true;
      parent = parent._meta.parent;
    }
    return false;
  }

  items(): SchemaInterface | Array<SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.items !== 'object') return;
    if (Array.isArray(this._schemaObject.items)) {
      return this._schemaObject.items.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/items/${index}`, parent: this }));
    }
    return this.createModel(Schema, this._schemaObject.items, { pointer: `${this._meta.pointer}/items`, parent: this });
  }

  maximum(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.maximum;
  }

  maxItems(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.maxItems;
  }

  maxLength(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.maxLength;
  }

  maxProperties(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.maxProperties;
  }

  minimum(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.minimum;
  }

  minItems(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.minItems;
  }

  minLength(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.minLength;
  }

  minProperties(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.minProperties;
  }

  multipleOf(): number | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.multipleOf;
  }

  not(): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.not !== 'object') return;
    return this.createModel(Schema, this._schemaObject.not, { pointer: `${this._meta.pointer}/not`, parent: this });
  }

  oneOf(): Array<SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    if (!Array.isArray(this._schemaObject.oneOf)) return undefined;
    return this._schemaObject.oneOf.map((s, index) => this.createModel(Schema, s, { pointer: `${this._meta.pointer}/oneOf/${index}`, parent: this }));
  }

  pattern(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.pattern;
  }

  patternProperties(): Record<string, SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.patternProperties !== 'object') return;
    return Object.entries(this._schemaObject.patternProperties).reduce((acc: Record<string, SchemaInterface>, [key, s]: [string, any]) => {
      acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/patternProperties/${key}`, parent: this });
      return acc;
    }, {});
  }

  properties(): Record<string, SchemaInterface> | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.properties !== 'object') return;
    return Object.entries(this._schemaObject.properties).reduce((acc: Record<string, SchemaInterface>, [key, s]: [string, any]) => {
      acc[key] = this.createModel(Schema, s, { pointer: `${this._meta.pointer}/properties/${key}`, parent: this });
      return acc;
    }, {});
  }

  property(name: string): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.properties !== 'object' || typeof this._schemaObject.properties[name] !== 'object') return;
    return this.createModel(Schema, this._schemaObject.properties[name], { pointer: `${this._meta.pointer}/properties/${name}`, parent: this });
  }

  propertyNames(): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.propertyNames !== 'object') return;
    return this.createModel(Schema, this._schemaObject.propertyNames, { pointer: `${this._meta.pointer}/propertyNames`, parent: this });
  }

  readOnly(): boolean | undefined {
    if (typeof this._schemaObject === 'boolean') return false;
    return this._schemaObject.readOnly || false;
  }

  required(): Array<string> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.required;
  }

  schemaFormat(): string {
    return this._schemaFormat;
  }

  then(): SchemaInterface | undefined {
    if (typeof this._schemaObject === 'boolean' || typeof this._schemaObject.then !== 'object') return;
    return this.createModel(Schema, this._schemaObject.then, { pointer: `${this._meta.pointer}/then`, parent: this });
  }

  title(): string | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.title;
  }

  type(): string | Array<string> | undefined {
    if (typeof this._schemaObject === 'boolean') return;
    return this._schemaObject.type;
  }

  uniqueItems(): boolean | undefined {
    if (typeof this._schemaObject === 'boolean') return false;
    return this._schemaObject.uniqueItems || false;
  }

  writeOnly(): boolean | undefined {
    if (typeof this._schemaObject === 'boolean') return false;
    return this._schemaObject.writeOnly || false;
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this as BaseModel<v3.AsyncAPISchemaDefinition>);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this as BaseModel<v3.AsyncAPISchemaDefinition>);
  }

  extensions(): ExtensionsInterface {
    return extensions(this as BaseModel<v3.AsyncAPISchemaDefinition>);
  }
}
