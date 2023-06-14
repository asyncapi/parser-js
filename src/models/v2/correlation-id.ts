import { BaseModel } from '../base';

import { hasDescription, description, extensions } from './mixins';

import type { CorrelationIdInterface } from '../correlation-id';
import type { ExtensionsInterface } from '../extensions';

import type { v2 } from '../../spec-types';

export class CorrelationId extends BaseModel<v2.CorrelationIDObject> implements CorrelationIdInterface {
  location(): string {
    return this._json.location;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
