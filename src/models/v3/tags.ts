import { Collection } from '../collection';

import type { TagsInterface } from '../tags';
import type { TagInterface } from '../tag';

export class Tags extends Collection<TagInterface> implements TagsInterface {
  override get(name: string): TagInterface | undefined {
    return this.collections.find(tag => {
      const componentId = tag.meta('componentId' as any);
      if (typeof componentId === 'string') return componentId === name;
      return tag.name() === name;
    });
  }
}
