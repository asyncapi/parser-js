import { Collection } from '../collection';

import type { SchemasInterface } from '../schemas';
import type { SchemaInterface } from '../schema';

export class Schemas extends Collection<SchemaInterface> implements SchemasInterface {
  override get(id: string): SchemaInterface | undefined {
    return this.collections.find(schema => schema.id() === id);
  }
}
