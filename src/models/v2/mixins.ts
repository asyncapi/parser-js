import { Bindings } from "./bindings";
import { Binding } from "./binding";
import { Extensions } from "./extensions";
import { Extension } from "./extension";
import { ExternalDocumentation } from "./external-docs";
import { Tags } from "./tags";
import { Tag } from "./tag";

import { createModel } from "../utils";
import { EXTENSION_REGEX } from '../../constants';

import type { BaseModel } from "../base";
import type { BindingsInterface } from "../bindings";
import type { ExtensionsInterface } from "../extensions";
import type { ExtensionInterface } from "../extension";
import type { ExternalDocumentationInterface } from "../external-docs";
import type { TagsInterface } from "../tags";

import type { v2 } from "../../spec-types";

export function bindings(model: BaseModel<{ bindings?: Record<string, any> }>): BindingsInterface {
  return new Bindings(
    Object.entries(model.json('bindings') || {}).map(([protocol, binding]) => 
      createModel(Binding, binding, { id: protocol, pointer: model.jsonPath(`bindings/${protocol}`) }, model)
    )
  );
}

export function hasDescription(model: BaseModel<{ description?: string }>) {
  return Boolean(model.json('description'));
};

export function description(model: BaseModel<{ description?: string }>): string | undefined {
  return model.json('description');
}

export function extensions(model: BaseModel<v2.SpecificationExtensions>): ExtensionsInterface {
  const extensions: ExtensionInterface[] = [];
  Object.entries(model.json()).forEach(([key, value]) => {
    if (EXTENSION_REGEX.test(key)) {
      extensions.push(
        createModel(Extension, value, { id: key, pointer: model.jsonPath(key) }, model)
      );
    }
  });
  return new Extensions(extensions);
};

export function hasExternalDocs(model: BaseModel<{ externalDocs?: v2.ExternalDocumentationObject }>): boolean {
  return Object.keys(model.json('externalDocs') || {}).length > 0;
};

export function externalDocs(model: BaseModel): ExternalDocumentationInterface | undefined { 
  if (hasExternalDocs(model)) {
    return new ExternalDocumentation(model.json('externalDocs'));
  }
  return;
};

export function tags(model: BaseModel<{ tags?: v2.TagsObject }>): TagsInterface {
  return new Tags(
    (model.json('tags') || []).map((tag: any, idx: number) => 
      createModel(Tag, tag, { pointer: model.jsonPath(`tags/${idx}`) }, model)
    )
  );
}
