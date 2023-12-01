import { BaseModel } from '../base';

import { hasDescription, description, extensions } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import type { OperationReplyAddressInterface } from '../operation-reply-address';

import type { v3 } from '../../spec-types';

export class OperationReplyAddress extends BaseModel<v3.OperationReplyAddressObject, { id?: string }> implements OperationReplyAddressInterface {
  id(): string | undefined {
    return this._meta.id;
  }

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
