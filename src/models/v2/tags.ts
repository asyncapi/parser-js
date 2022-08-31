import { Collection } from "../collection";

import type { TagsInterface } from "../tags";
import type { TagInterface } from "../tag";

export class Tags extends Collection<TagInterface> implements TagsInterface {
  protected override __get(name: string): TagInterface | undefined {
    return this.collections.find(tag => tag.name() === name);
  }
}
