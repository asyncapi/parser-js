import { BaseModel } from '../base';

import type { ExtensionInterface } from '../extension';

import type { v3 } from '../../spec-types';

export class Extension<T = any> extends BaseModel<v3.SpecificationExtension<T>, { id: string }> implements ExtensionInterface<T> {
  id(): string {
    return this._meta.id;
  }

  version(): string {
    return 'to implement';
  }

  value<V = T>(): V {
    return this._json as unknown as V;
  }
}
