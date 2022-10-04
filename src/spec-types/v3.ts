import type { JSONSchema7Version, JSONSchema7TypeName, JSONSchema7Type } from 'json-schema';

export type AsyncAPIVersion = string;
export type Identifier = string;
export type DefaultContentType = string;

export interface AsyncAPIObject extends SpecificationExtensions {
  asyncapi: AsyncAPIVersion;
  id?: Identifier;
  info: InfoObject;
  defaultContentType?: DefaultContentType;
}

export interface InfoObject extends SpecificationExtensions {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  tags?: TagsObject;
  externalDocs?: ExternalDocumentationObject;
}

export interface ContactObject extends SpecificationExtensions {
  name?: string;
  url?: string;
  email?: string;
}

export interface LicenseObject extends SpecificationExtensions {
  name: string;
  url?: string;
}

export interface ServerBindingsObject extends SpecificationExtensions {
  http?: Binding;
  ws?: Binding;
  kafka?: Binding;
  anypointmq?: Binding;
  amqp?: Binding;
  amqp1?: Binding;
  mqtt?: Binding;
  mqtt5?: Binding;
  nats?: Binding;
  jms?: Binding;
  sns?: Binding;
  sqs?: Binding;
  stomp?: Binding;
  redis?: Binding;
  mercure?: Binding;
  ibmmq?: Binding;
}

export interface ChannelBindingsObject extends SpecificationExtensions {
  http?: Binding;
  ws?: Binding;
  kafka?: Binding;
  anypointmq?: Binding;
  amqp?: Binding;
  amqp1?: Binding;
  mqtt?: Binding;
  mqtt5?: Binding;
  nats?: Binding;
  jms?: Binding;
  sns?: Binding;
  sqs?: Binding;
  stomp?: Binding;
  redis?: Binding;
  mercure?: Binding;
  ibmmq?: Binding;
}

export interface OperationBindingsObject extends SpecificationExtensions {
  http?: Binding;
  ws?: Binding;
  kafka?: Binding;
  anypointmq?: Binding;
  amqp?: Binding;
  amqp1?: Binding;
  mqtt?: Binding;
  mqtt5?: Binding;
  nats?: Binding;
  jms?: Binding;
  sns?: Binding;
  sqs?: Binding;
  stomp?: Binding;
  redis?: Binding;
  mercure?: Binding;
  ibmmq?: Binding;
}

export interface MessageBindingsObject extends SpecificationExtensions {
  http?: Binding;
  ws?: Binding;
  kafka?: Binding;
  anypointmq?: Binding;
  amqp?: Binding;
  amqp1?: Binding;
  mqtt?: Binding;
  mqtt5?: Binding;
  nats?: Binding;
  jms?: Binding;
  sns?: Binding;
  sqs?: Binding;
  stomp?: Binding;
  redis?: Binding;
  mercure?: Binding;
  ibmmq?: Binding;
}

export type TagsObject = Array<TagObject>;

export interface TagObject extends SpecificationExtensions {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export interface ExternalDocumentationObject extends SpecificationExtensions {
  url: string;
  description?: string;
}

export interface ComponentsObject extends SpecificationExtensions {
  tags?: Record<string, TagObject | ReferenceObject>;
  externalDocs?: Record<string, ExternalDocumentationObject | ReferenceObject>;
  serverBindings?: Record<string, ServerBindingsObject | ReferenceObject>;
  channelBindings?: Record<string, ChannelBindingsObject | ReferenceObject>;
  operationBindings?: Record<string, OperationBindingsObject | ReferenceObject>;
  messageBindings?: Record<string, MessageBindingsObject | ReferenceObject>;
}

export type SchemaObject = AsyncAPISchemaObject | ReferenceObject;

export type AsyncAPISchemaObject = AsyncAPISchemaDefinition | boolean;
export interface AsyncAPISchemaDefinition extends SpecificationExtensions {
  $id?: string;
  $schema?: JSONSchema7Version;
  $comment?: string;

  type?: JSONSchema7TypeName | JSONSchema7TypeName[];
  enum?: JSONSchema7Type[];
  const?: JSONSchema7Type;

  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;

  maxLength?: number;
  minLength?: number;
  pattern?: string;

  items?: AsyncAPISchemaObject | AsyncAPISchemaObject[];
  additionalItems?: AsyncAPISchemaObject;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  contains?: AsyncAPISchemaObject;

  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  properties?: {
    [key: string]: AsyncAPISchemaObject;
  };
  patternProperties?: {
    [key: string]: AsyncAPISchemaObject;
  };
  additionalProperties?: AsyncAPISchemaObject;
  dependencies?: {
    [key: string]: AsyncAPISchemaObject | string[];
  };
  propertyNames?: AsyncAPISchemaObject;

  if?: AsyncAPISchemaObject;
  then?: AsyncAPISchemaObject;
  else?: AsyncAPISchemaObject;

  allOf?: AsyncAPISchemaObject[];
  anyOf?: AsyncAPISchemaObject[];
  oneOf?: AsyncAPISchemaObject[];
  not?: AsyncAPISchemaObject;

  format?: string;

  contentMediaType?: string;
  contentEncoding?: string;

  definitions?: {
    [key: string]: AsyncAPISchemaObject;
  };

  title?: string;
  description?: string;
  default?: JSONSchema7Type;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: Array<JSONSchema7Type>;

  discriminator?: string;
  externalDocs?: ExternalDocumentationObject;
  deprecated?: boolean;
  [keyword: string]: any;
}

export interface Binding {
  bindingVersion?: string;
}

export interface SpecificationExtensions {
  [extension: `x-${string}`]: SpecificationExtension;
}

export type SpecificationExtension<T = any> = T;

export interface ReferenceObject {
  $ref: string;
}