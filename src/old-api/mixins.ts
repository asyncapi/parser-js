import { Base } from './base';
import { ExternalDocs } from './external-docs';
import { Tag } from './tag';

import { EXTENSION_REGEX } from '../constants';

import type { v2 } from '../spec-types';

export abstract class SpecificationExtensionsModel<J = any, M extends Record<string, any> = Record<string, any>> extends Base<J & v2.SpecificationExtensions, M> {
  hasExtensions() {
    return extensionsMixins.hasExtensions(this);
  }

  extensions(): v2.SpecificationExtensions {
    return extensionsMixins.extensions(this);
  }

  extensionKeys() {
    return extensionsMixins.extensionKeys(this);
  }

  extKeys() {
    return extensionsMixins.extKeys(this);
  }

  hasExtension(extension: string) {
    return extensionsMixins.hasExtension(this, extension);
  }

  extension(extension: string): v2.SpecificationExtension {
    return extensionsMixins.extension(this, extension);
  }

  hasExt(extension: string) {
    return extensionsMixins.hasExt(this, extension);
  }

  ext(extension: string) {
    return extensionsMixins.ext(this, extension);
  }
}

export function hasDescription(model: Base<{ description?: string }>) {
  return Boolean(model.json('description'));
}

export function description(model: Base<{ description?: string }>): string | undefined {
  return model.json('description');
}

export function hasExternalDocs(model: Base<{ externalDocs?: v2.ExternalDocumentationObject }>): boolean {
  return Object.keys(model.json('externalDocs') || {}).length > 0;
}

export function externalDocs(model: Base<{ externalDocs?: v2.ExternalDocumentationObject }>): ExternalDocs | undefined { 
  if (hasExternalDocs(model)) {
    return new ExternalDocs(model.json('externalDocs') as v2.ExternalDocumentationObject);
  }
}

export const extensionsMixins = {
  hasExtensions(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>) {
    return !!extensionsMixins.extensionKeys(model).length;
  },

  extensions(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>): v2.SpecificationExtensions {
    const result: v2.SpecificationExtensions = {};
    Object.entries(model.json()).forEach(([key, value]) => {
      if (EXTENSION_REGEX.test(key)) {
        result[key as 'x-'] = value;
      }
    });
    return result;
  },

  extensionKeys(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>) {
    return Object.keys(extensionsMixins.extensions(model));
  },

  extKeys(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>) {
    return extensionsMixins.extensionKeys(model);
  },

  hasExtension(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>, extension: string) {
    if (!extension.startsWith('x-')) {
      return false;
    }
    return !!(model.json() as Record<string, any>)[extension];
  },

  extension(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>, extension: string): v2.SpecificationExtension | null {
    if (!extension.startsWith('x-')) {
      return null;
    }
    return (model.json() as Record<string, any>)[extension];
  },

  hasExt(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>, extension: string) {
    return extensionsMixins.hasExtension(model, extension);
  },

  ext(model: Base<{ [extension: `x-${string}`]: v2.SpecificationExtension; }>, extension: string) {
    return extensionsMixins.extension(model, extension);
  },
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
};

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
};

interface Constructor<T> extends Function {
  new (...any: any[]): T;
}
type InferModelData<T> = T extends Base<infer J> ? J : never;
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
type InferModelMetadata<T> = T extends Base<infer J, infer M> ? M : never;

export function getMapValue<T extends Record<string, any>, K extends keyof T>(obj: T | undefined, key: K): T[K] | null;
export function getMapValue<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, key: string, Type: Constructor<T>, meta?: InferModelMetadata<T>): T | null;
export function getMapValue<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, key: string, Type?: Constructor<T>, meta?: InferModelMetadata<T>) {
  if (typeof key !== 'string' || !obj) return null;
  const v = obj[String(key)];
  if (v === undefined) return null;
  return Type ? new Type(v, meta) : v;
}

export function createMapOfType<T extends Base>(obj: Record<string, InferModelData<T>> | undefined, Type: Constructor<T>, meta?: InferModelMetadata<T>): Record<string, T> {
  const result: Record<string, T> = {};
  if (!obj) return result;

  Object.entries(obj).forEach(([key, value]) => {
    result[key] = new Type(value, meta);
  });

  return result;
}
