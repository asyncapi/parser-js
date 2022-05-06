import { BaseModel } from "../base";

import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { CorrelationIdInterface } from "../correlation-id";

export class CorrelationId extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) implements CorrelationIdInterface {
  hasLocation(): boolean {
    return !!this._json.location;
  }

  location(): string | undefined {
    return this._json.location;
  }
}
