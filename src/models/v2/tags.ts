import { Collection } from "../collection";

import type { TagsInterface } from "../tags";
import type { TagInterface } from "../tag";

export class Tags extends Collection<TagInterface> implements TagsInterface {
  override get(name: string): TagInterface | undefined {
    return this.collections.find(tag => tag.name() === name);
  };

  override has(name: string): boolean {
    return this.collections.some(tag => tag.name() === name);
  };
}
