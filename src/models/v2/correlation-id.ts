import { BaseModel } from "../base";

import { hasDescription, description, extensions } from './mixins';

import type { CorrelationIdInterface } from "../correlation-id";
import type { ExtensionsInterface } from "../extensions";

import type { v2 } from "../../interfaces";

export class CorrelationId extends BaseModel<v2.CorrelationIDObject> implements CorrelationIdInterface {
  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasLocation(): boolean {
    return !!this._json.location;
  }

  location(): string | undefined {
    return this._json.location;
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
