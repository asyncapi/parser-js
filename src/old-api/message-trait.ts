import { SpecificationExtensionsModel, description, hasDescription, hasExternalDocs, externalDocs, tagsMixins, bindingsMixins, getMapValue } from './mixins';
import { CorrelationId } from './correlation-id';
import { Schema } from './schema';

import type { v2 } from '../spec-types';

export class MessageTrait<T> extends SpecificationExtensionsModel<T & v2.MessageTraitObject> {
  id() {
    return this._json.messageId;
  }

  headers() {
    if (!this._json.headers) return null;
    return new Schema(this._json.headers as any);
  }

  header(name: string) {
    if (!this._json.headers) return null;
    return getMapValue((this._json.headers as any).properties || {}, name, Schema);
  }

  correlationId() {
    if (!this._json.correlationId) return null;
    return new CorrelationId(this._json.correlationId as v2.CorrelationIDObject);
  }

  schemaFormat() {
    return this._json.schemaFormat as string; // Old API points always to the default schema format for given AsyncAPI version, so we need to force returned type as string.
  }

  contentType() {
    return this._json.contentType;
  }

  name() {
    return this._json.name;
  }

  title() {
    return this._json.title;
  }

  summary() {
    return this._json.summary;
  }

  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }

  externalDocs() {
    return externalDocs(this);
  }

  hasExternalDocs() {
    return hasExternalDocs(this);
  }

  hasTags() {
    return tagsMixins.hasTags(this);
  }

  tags() {
    return tagsMixins.tags(this);
  }

  tagNames() {
    return tagsMixins.tagNames(this);
  }

  hasTag(name: string) {
    return tagsMixins.hasTag(this, name);
  }

  tag(name: string) {
    return tagsMixins.tag(this, name);
  }

  hasBindings() {
    return bindingsMixins.hasBindings(this as any);
  }

  bindings() {
    return bindingsMixins.bindings(this as any);
  }

  bindingProtocols() {
    return bindingsMixins.bindingProtocols(this as any);
  }

  hasBinding(name: string): boolean {
    return bindingsMixins.hasBinding(this as any, name);
  }

  binding(name: string) {
    return bindingsMixins.binding(this as any, name);
  }

  examples() {
    return this._json.examples;
  }
}
