import { Collection } from '../collection';

import type { SchemasInterface } from '../schemas';
import type { SchemaInterface } from '../schema';

import { filterByInUse, filterByNotInUse } from './mixins';

export class Schemas extends Collection<SchemaInterface> implements SchemasInterface {
  override get(id: string): SchemaInterface | undefined {
    return this.collections.find(schema => schema.uid() === id);
  }

  filterByInUse(): SchemaInterface[] {
    return filterByInUse(this);
  }

  filterByNotInUse(): SchemaInterface[] {
    return filterByNotInUse(this);
  }
}
