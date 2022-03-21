import { BaseModel } from "../../base";

import type { DescriptionMixinInterface } from "../../mixins";

export abstract class DescriptionMixin extends BaseModel implements DescriptionMixinInterface {
  hasDescription() {
    return Boolean(this._json.description);
  };

  description(): string | undefined {
    return this._json.description;
  }
}