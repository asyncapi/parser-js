import { Bindings } from './bindings';
import { Binding } from './binding';
import { Extensions } from './extensions';
import { Extension } from './extension';
import { ExternalDocumentation } from './external-docs';
import { Tags } from './tags';
import { Tag } from './tag';

import { createModel } from '../utils';
import { EXTENSION_REGEX } from '../../constants';

import type { BaseModel } from '../base';
import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExtensionInterface } from '../extension';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { TagsInterface } from '../tags';

import type { v2 } from '../../spec-types';
import { Collection } from 'models/collection';

export function bindings(model: BaseModel<{ bindings?: Record<string, any> }>): BindingsInterface {
  const bindings = model.json('bindings') || {};
  return new Bindings(
    Object.entries(bindings || {}).map(([protocol, binding]) => 
      createModel(Binding, binding, { protocol, pointer: model.jsonPath(`bindings/${protocol}`) }, model)
    ),
    { originalData: bindings, asyncapi: model.meta('asyncapi'), pointer: model.jsonPath('bindings') }
  );
}

export function hasDescription(model: BaseModel<{ description?: string }>) {
  return Boolean(description(model));
}

export function description(model: BaseModel<{ description?: string }>): string | undefined {
  return model.json('description');
}

export function extensions(model: BaseModel<v2.SpecificationExtensions>): ExtensionsInterface {
  const extensions: ExtensionInterface[] = [];
  Object.entries(model.json()).forEach(([id, value]: [string, any]) => {
    if (EXTENSION_REGEX.test(id)) {
      extensions.push(
        createModel(Extension, value, { id, pointer: model.jsonPath(id) } as any, model) as Extension
      );
    }
  });
  return new Extensions(extensions);
}

export function hasExternalDocs(model: BaseModel<{ externalDocs?: v2.ExternalDocumentationObject }>): boolean {
  return Object.keys(model.json('externalDocs') || {}).length > 0;
}

export function externalDocs(model: BaseModel<{ externalDocs?: v2.ExternalDocumentationObject }>): ExternalDocumentationInterface | undefined { 
  if (hasExternalDocs(model)) {
    return new ExternalDocumentation(model.json('externalDocs') as v2.ExternalDocumentationObject);
  }
}

export function tags(model: BaseModel<{ tags?: v2.TagsObject }>): TagsInterface {
  return new Tags(
    (model.json('tags') || []).map((tag, idx) => 
      createModel(Tag, tag, { pointer: model.jsonPath(`tags/${idx}`) }, model)
    )
  );
}

export function filterByInUse<T extends BaseModel>(collection: Collection<T>): T[] {
  return collection.filterBy((item: T): boolean => {
    // In the case of using $ref to reference any item from components, it will be already resolved since references are resolved before parsing, and will use another pointer rather than /components/...
    return !item.meta().pointer.startsWith('/components'); 
  });
}

export function filterByNotInUse<T extends BaseModel>(collection: Collection<T>): T[] {
  return collection.filterBy((item: T): boolean => {
    // In the case of using $ref to reference any item from components, it will be already resolved since references are resolved before parsing, and will use another pointer rather than /components/...
    return item.meta().pointer.startsWith('/components'); 
  });
}