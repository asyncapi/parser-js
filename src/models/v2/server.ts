import { BaseModel } from '../base';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from "../base";
import type { ServerInterface } from '../server';

export class Server extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin) implements ServerInterface {
  constructor(
    private readonly _id: string,
    _json: Record<string, any>,
    _meta: ModelMetadata = {} as any,
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._id;
  }

  url(): string {
    return this._json.url;
  }

  protocol(): string | undefined {
    return this._json.protocol;
  }

  hasProtocolVersion(): boolean {
    return !!this._json.protocolVersion;
  }

  protocolVersion(): string {
    return this._json.protocolVersion;
  }
}