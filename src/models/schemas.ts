import { Collection } from './collection';
import type { SchemaInterface } from './schema';

export type SchemasInterface = Collection<SchemaInterface>

export class Schemas extends Collection<SchemaInterface> implements SchemasInterface {
  override get(id: string): SchemaInterface | undefined {
    return this.collections.find(schema => schema.id() === id);
  }
}
