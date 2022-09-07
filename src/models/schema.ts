import type { BaseModel } from './base';
import type { ExtensionsMixinInterface, ExternalDocumentationMixinInterface } from './mixins';
import type { v2 } from '../spec-types';

export interface SchemaInterface extends BaseModel<v2.AsyncAPISchemaObject>, ExtensionsMixinInterface, ExternalDocumentationMixinInterface {
  uid(): string;
  $comment(): string | undefined;
  $id(): string | undefined;
  $schema(): string;
  additionalItems(): boolean | SchemaInterface;
  additionalProperties(): boolean | SchemaInterface;
  allOf(): Array<SchemaInterface> | undefined;
  anyOf(): Array<SchemaInterface> | undefined;
  const(): any;
  contains(): SchemaInterface | undefined;
  contentEncoding(): string | undefined;
  contentMediaType(): string | undefined;
  default(): any;
  definitions(): Record<string, SchemaInterface> | undefined;
  description(): string | undefined;
  dependencies(): Record<string, SchemaInterface | Array<string>> | undefined;
  deprecated(): boolean;
  discriminator(): string | undefined;
  else(): SchemaInterface | undefined;
  enum(): Array<any> | undefined;
  examples(): Array<any> | undefined;
  exclusiveMaximum(): number | undefined;
  exclusiveMinimum(): number | undefined;
  format(): string | undefined;
  isBooleanSchema(): boolean;
  if(): SchemaInterface | undefined;
  isCircular(): boolean;
  items(): SchemaInterface | Array<SchemaInterface> | undefined;
  maximum(): number | undefined;
  maxItems(): number | undefined;
  maxLength(): number | undefined;
  maxProperties(): number | undefined;
  minimum(): number | undefined;
  minItems(): number | undefined;
  minLength(): number | undefined;
  minProperties(): number | undefined;
  multipleOf(): number | undefined;
  not(): SchemaInterface | undefined;
  oneOf(): Array<SchemaInterface> | undefined;
  pattern(): string | undefined;
  patternProperties(): Record<string, SchemaInterface> | undefined;
  properties(): Record<string, SchemaInterface> | undefined;
  property(name: string): SchemaInterface | undefined;
  propertyNames(): SchemaInterface | undefined;
  readOnly(): boolean | undefined;
  required(): Array<string> | undefined;
  then(): SchemaInterface | undefined;
  title(): string | undefined;
  type(): string | Array<string> | undefined;
  uniqueItems(): boolean | undefined;
  writeOnly(): boolean | undefined;
}