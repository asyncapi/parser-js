import type { Collection } from './collection';
import { FilterByUsageMixingInterface } from './mixins';
import type { SchemaInterface } from './schema';

export interface SchemasInterface extends Collection<SchemaInterface>, FilterByUsageMixingInterface<SchemaInterface> {}
