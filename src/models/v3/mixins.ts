import { BaseModel } from '../base';
import { Bindings } from './bindings';
import { Binding } from './binding';
import { Extensions } from '../extensions';
import { Extension } from './extension';
import { ExternalDocumentation } from './external-documentation';
import { Tags } from '../tags';
import { Tag } from './tag';

import { createModel } from '../utils';
import { EXTENSION_REGEX } from '../../constants';

import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExtensionInterface } from '../extension';
import type { ExternalDocumentationInterface } from '../external-documentation';
import type { TagsInterface } from '../tags';

import type { v3 } from '../../spec-types';

type BindingsObject =
  | v3.ServerBindingsObject
  | v3.ChannelBindingsObject
  | v3.OperationBindingsObject
  | v3.MessageBindingsObject
  | v3.ReferenceObject;

export interface CoreObject extends v3.SpecificationExtensions {
  title?: string;
  summary?: string;
  description?: string;
  externalDocs?: v3.ExternalDocumentationObject | v3.ReferenceObject;
  tags?: v3.TagsObject;
  bindings?: BindingsObject;
}

export abstract class CoreModel<J extends CoreObject = CoreObject, M extends Record<string, any> = {}> extends BaseModel<J, M> {
  hasTitle(): boolean {
    return !!this._json.title;
  }

  title(): string | undefined {
    return this._json.title;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string | undefined {
    return this._json.summary;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }

  tags(): TagsInterface {
    return tags(this);
  }

  bindings(): BindingsInterface {
    return bindings(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}

export function bindings(model: BaseModel<{ bindings?: BindingsObject }>): BindingsInterface {
  const bindings = model.json('bindings') || {};
  return new Bindings(
    Object.entries(bindings || {}).map(([protocol, binding]) => 
      createModel(Binding, binding, { protocol, pointer: model.jsonPath(`bindings/${protocol}`) }, model)
    ),
    { originalData: bindings as Record<string, Binding>, asyncapi: model.meta('asyncapi'), pointer: model.jsonPath('bindings') }
  );
}

export function hasDescription(model: BaseModel<{ description?: string }>) {
  return Boolean(description(model));
}

export function description(model: BaseModel<{ description?: string }>): string | undefined {
  return model.json('description');
}

export function extensions(model: BaseModel<v3.SpecificationExtensions>): ExtensionsInterface {
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

export function hasExternalDocs(model: BaseModel<{ externalDocs?: v3.ExternalDocumentationObject | v3.ReferenceObject }>): boolean {
  return Object.keys(model.json('externalDocs') || {}).length > 0;
}

export function externalDocs(model: BaseModel<{ externalDocs?: v3.ExternalDocumentationObject | v3.ReferenceObject }>): ExternalDocumentationInterface | undefined { 
  if (hasExternalDocs(model as BaseModel<{ externalDocs?: v3.ExternalDocumentationObject }>)) {
    return new ExternalDocumentation(model.json('externalDocs') as v3.ExternalDocumentationObject);
  }
}

export function tags(model: BaseModel<{ tags?: v3.TagsObject }>): TagsInterface {
  return new Tags(
    (model.json('tags') || []).map((tag, idx) => 
      createModel(Tag, tag as v3.TagObject, { pointer: model.jsonPath(`tags/${idx}`) }, model)
    )
  );
}
