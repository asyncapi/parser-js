import { BaseModel } from "../base";

export interface DescriptionMixinInterface {
  hasDescription(): boolean;
  description(): string | undefined;
}

export abstract class DescriptionMixin extends BaseModel implements DescriptionMixinInterface {
  hasDescription() {
    return Boolean(this._json.description);
  };

  description(): string | undefined {
    return this._json.description;
  }
}
