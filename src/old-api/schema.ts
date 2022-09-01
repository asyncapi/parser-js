import { SpecificationExtensionsModel } from './mixins';

import type { v2 } from '../spec-types';

export class Schema extends SpecificationExtensionsModel<v2.AsyncAPISchemaObject, { parent?: Schema }> {
}