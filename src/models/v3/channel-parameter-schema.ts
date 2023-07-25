import { BaseModel } from '../base';

import { xParserSchemaId } from '../../constants';
import { extensions } from './mixins';
import { retrievePossibleRef } from '../../utils';

import type { ModelMetadata } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { SchemaInterface } from '../schema';

import type { v3 } from '../../spec-types';

export class ParameterSchema extends BaseModel<v3.ParameterObject, { }> implements SchemaInterface {
  constructor(
    _json: v3.ParameterObject,
    _meta: ModelMetadata & { } = {} as any,
  ) {
    _json = retrievePossibleRef(_json, _meta.pointer as string, _meta.asyncapi?.parsed);
    super(_json, _meta);
  }

  id(): string {
    return this.$id() || this.json(xParserSchemaId as any) as string;
  }

  $comment(): string | undefined {
    return undefined;
  }

  $id(): string | undefined {
    return undefined;
  }

  $schema(): string {
    return 'http://json-schema.org/draft-07/schema#';
  }

  additionalItems(): boolean | SchemaInterface {
    return false;
  }

  additionalProperties(): boolean | SchemaInterface {
    return false;
  }

  allOf(): Array<SchemaInterface> | undefined {
    return undefined;
  }

  anyOf(): Array<SchemaInterface> | undefined {
    return undefined;
  }

  const(): any {
    return undefined;
  }

  contains(): SchemaInterface | undefined {
    return undefined;
  }

  contentEncoding(): string | undefined {
    return undefined;
  }

  contentMediaType(): string | undefined {
    return undefined;
  }

  default(): any {
    return this._json.default;
  }

  definitions(): Record<string, SchemaInterface> | undefined {
    return undefined;
  }

  description(): string | undefined {
    return this._json.description;
  }

  dependencies(): Record<string, SchemaInterface | Array<string>> | undefined {
    return undefined;
  }

  deprecated(): boolean {
    return false;
  }

  discriminator(): string | undefined {
    return undefined;
  }

  else(): SchemaInterface | undefined {
    return undefined;
  }

  enum(): Array<any> | undefined {
    return this._json.enum;
  }

  examples(): Array<any> | undefined {
    return this._json.examples;
  }

  exclusiveMaximum(): number | undefined {
    return undefined;
  }

  exclusiveMinimum(): number | undefined {
    return undefined;
  }

  format(): string | undefined {
    return undefined;
  }

  isBooleanSchema(): boolean {
    return false;
  }

  if(): SchemaInterface | undefined {
    return undefined;
  }

  isCircular(): boolean {
    return false;
  }

  items(): SchemaInterface | Array<SchemaInterface> | undefined {
    return undefined;
  }

  maximum(): number | undefined {
    return undefined;
  }

  maxItems(): number | undefined {
    return undefined;
  }

  maxLength(): number | undefined {
    return undefined;
  }

  maxProperties(): number | undefined {
    return undefined;
  }

  minimum(): number | undefined {
    return undefined;
  }

  minItems(): number | undefined {
    return undefined;
  }

  minLength(): number | undefined {
    return undefined;
  }

  minProperties(): number | undefined {
    return undefined;
  }

  multipleOf(): number | undefined {
    return undefined;
  }

  not(): SchemaInterface | undefined {
    return undefined;
  }

  oneOf(): Array<SchemaInterface> | undefined {
    return undefined;
  }

  pattern(): string | undefined {
    return undefined;
  }

  patternProperties(): Record<string, SchemaInterface> | undefined {
    return undefined;
  }

  properties(): Record<string, SchemaInterface> | undefined {
    return undefined;
  }

  property(): SchemaInterface | undefined {
    return undefined;
  }

  propertyNames(): SchemaInterface | undefined {
    return undefined;
  }

  readOnly(): boolean | undefined {
    return undefined;
  }

  required(): Array<string> | undefined {
    return undefined;
  }

  then(): SchemaInterface | undefined {
    return undefined;
  }

  title(): string | undefined {
    return undefined;
  }

  type(): string | Array<string> | undefined {
    return 'string';
  }

  uniqueItems(): boolean | undefined {
    return undefined;
  }

  writeOnly(): boolean | undefined {
    return undefined;
  }

  hasExternalDocs(): boolean {
    return false;
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return undefined;
  }

  extensions(): ExtensionsInterface {
    return extensions(this as BaseModel<v3.AsyncAPISchemaDefinition>);
  }
}
