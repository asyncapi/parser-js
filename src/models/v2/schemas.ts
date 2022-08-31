import { Collection } from '../collection';

import type { SchemasInterface } from '../schemas';
import type { SchemaInterface } from '../schema';

export class Schemas extends Collection<SchemaInterface> implements SchemasInterface {
  protected override __get(id: string): SchemaInterface | undefined {
    return this.collections.find(schema => schema.uid() === id);
  }
}
