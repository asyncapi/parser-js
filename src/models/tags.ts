import { Collection } from './collection';

import type { TagInterface } from './tag';

export type TagsInterface = Collection<TagInterface>

export class Tags extends Collection<TagInterface> implements TagsInterface {
  override get(name: string): TagInterface | undefined {
    return this.collections.find(tag => tag.name() === name);
  }
}