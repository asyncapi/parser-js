import { Base } from './base';
import { ExternalDocs } from './external-docs';
import { Tag } from './tag';

import { EXTENSION_REGEX } from '../constants';

import type { v2 } from '../spec-types';

export abstract class SpecificationExtensionsModel<J = any, M extends Record<string, any> = Record<string, any>> extends Base<J & v2.SpecificationExtensions, M> {
  hasExtensions() {
    return !!this.extensionKeys().length;
  }

  extensions(): v2.SpecificationExtensions {
    const result: v2.SpecificationExtensions = {};
    Object.entries(this._json).forEach(([key, value]) => {
      if (EXTENSION_REGEX.test(key)) {
        result[key as `x-`] = value;
      }
    });
    return result;
  }

  extensionKeys() {
    return Object.keys(this.extensions());
  }

  extKeys() {
    return this.extensionKeys();
  }

  hasExtension(extension: string) {
    if (!extension.startsWith('x-')) {
      return false;
    }
    return !!(this._json as Record<string, any>)[extension];
  }

  extension(extension: string): v2.SpecificationExtension {
    if (!extension.startsWith('x-')) {
      return null;
    }
    return (this._json as Record<string, any>)[extension];
  }

  hasExt(extension: string) {
    return this.hasExtension(extension);
  }

  ext(extension: string) {
    return this.extension(extension);
  }
}

export function hasDescription(model: Base<{ description?: string }>) {
  return Boolean(model.json('description'));
};

export function description(model: Base<{ description?: string }>): string | undefined {
  return model.json('description');
}

export function hasExternalDocs(model: Base<{ externalDocs?: v2.ExternalDocumentationObject }>): boolean {
  return Object.keys(model.json('externalDocs') || {}).length > 0;
};

export function externalDocs(model: Base<{ externalDocs?: v2.ExternalDocumentationObject }>): ExternalDocs | undefined { 
  if (hasExternalDocs(model)) {
    return new ExternalDocs(model.json('externalDocs') as v2.ExternalDocumentationObject);
  }
  return;
};

export const bindingsMixins = {
  hasBindings(model: Base<{ bindings?: Record<string, v2.Binding> }>) {
    return !!Object.keys(bindingsMixins.bindings(model)).length;
  },

  bindings(model: Base<{ bindings?: Record<string, v2.Binding> }>): Record<string, v2.Binding> {
    return model.json('bindings') || {} as Record<string, v2.Binding>;
  },

  bindingProtocols(model: Base<{ bindings?: Record<string, v2.Binding> }>) {
    return Object.keys(bindingsMixins.bindings(model));
  },

  hasBinding(model: Base<{ bindings?: Record<string, v2.Binding> }>, name: string): boolean {
    return !!bindingsMixins.binding(model, name);
  },

  binding(model: Base<{ bindings?: Record<string, v2.Binding> }>, name: string) {
    return getMapValue(model.json('bindings'), name);
  },
}

export const tagsMixins = {
  hasTags(model: Base<{ tags?: Array<v2.TagObject> }>): boolean {
    return !!tagsMixins.tags(model).length;
  },

  tags(model: Base<{ tags?: Array<v2.TagObject> }>): Array<Tag> {
    const tags = model.json('tags');
    return tags ? tags.map(t => new Tag(t)) : [];
  },

  tagNames(model: Base<{ tags?: Array<v2.TagObject> }>) {
    const tags = model.json('tags');
    return tags ? tags.map(t => t.name) : [];
  },

  hasTag(model: Base<{ tags?: Array<v2.TagObject> }>, name: string): boolean {
    return !!tagsMixins.tag(model, name);
  },

  tag(model: Base<{ tags?: Array<v2.TagObject> }>, name: string) {
    const tg = (model.json('tags') || []).find(t => t.name === name);
    return tg ? new Tag(tg) : null;
  },
}

interface Constructor<T> extends Function {
  new (...any: any[]): T;
}
type InferModelData<T> = T extends Base<infer J> ? J : never;
type InferModelMetadata<T> = T extends Base<infer J, infer M> ? M : never;

export function getMapValue<T extends Record<string, any>, K extends keyof T>(obj: T | undefined, key: K): T[K] | null;
export function getMapValue<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, key: string, Type: Constructor<T>, options?: InferModelMetadata<T>): T | null;
export function getMapValue<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, key: string, Type?: Constructor<T>, options?: InferModelMetadata<T>) {
  if (typeof key !== 'string' || !obj) return null;
  const v = obj[String(key)];
  if (v === undefined) return null;
  return Type ? new Type(v, options) : v;
};

export function createMapOfType<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, Type: Constructor<T>, options?: InferModelMetadata<T>): Record<string, T> {
  const result: Record<string, T> = {};
  if (!obj) return result;

  Object.entries(obj).forEach(([key, value]) => {
    result[key] = new Type(value, options);
  });

  return result;
};
