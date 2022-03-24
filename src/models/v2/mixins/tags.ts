import { BaseModel } from "../../base";
import { Collection } from "../../collection";

import { Mixin } from '../../utils';
import { DescriptionMixin } from './description';
import { ExtensionsMixin } from './extensions';
import { ExternalDocumentationMixin } from './external-docs';

import type { TagsMixinInterface } from "../../mixins";
import type { TagsInterface } from "../../tags";
import type { TagInterface } from "../../tag";

export class Tag 
  extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin, ExternalDocumentationMixin) 
  implements TagInterface {

  name(): string {
    return this._json.name;
  }
}

export class Tags extends Collection<TagInterface> implements TagsInterface {
  override get(name: string): TagInterface | undefined {
    return this.collections.find(tag => tag.name() === name);
  };

  override has(name: string): boolean {
    return this.collections.some(tag => tag.name() === name);
  };
}

export abstract class TagsMixin extends BaseModel implements TagsMixinInterface { 
  tags(): TagsInterface {
    const tags = this._json.tags || [];
    return new Tags(tags.map((tag: any, idx: number) => this.createModel(Tag, tag, { pointer: `${this._meta.pointer}/tags/${idx}` })));
  }
}