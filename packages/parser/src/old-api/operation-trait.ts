import { SpecificationExtensionsModel, description, hasDescription, hasExternalDocs, externalDocs, tagsMixins, bindingsMixins } from './mixins';
import { SecurityRequirement } from './security-requirement';

import type { v2 } from '../spec-types';

export class OperationTrait<T> extends SpecificationExtensionsModel<T & v2.OperationTraitObject, { kind: 'publish' | 'subscribe' }> {
  isPublish() {
    return this._meta.kind === 'publish';
  }

  isSubscribe() {
    return this._meta.kind === 'subscribe';
  }

  kind() {
    return this._meta.kind;
  }

  id() {
    return this._json.operationId;
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

  security() {
    if (!this._json.security) return null;
    return this._json.security.map(sec => new SecurityRequirement(sec));
  }
}
