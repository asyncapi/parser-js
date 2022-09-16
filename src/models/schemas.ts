import type { Collection } from './collection';
import type { SchemaInterface } from './schema';

export interface SchemasInterface extends Collection<SchemaInterface> {
    filterByInUse(): SchemaInterface[];
    filterByNotInUse(): SchemaInterface[];
}
