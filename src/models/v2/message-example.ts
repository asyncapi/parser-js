import { BaseModel } from "../base";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import type { MessageExampleInterface } from "../message-example";

export class MessageExample extends Mixin(BaseModel, ExtensionsMixin) implements MessageExampleInterface {
  hasName(): boolean {
    return !!this._json.name;
  }

  name(): string {
    return this._json.name;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string {
    return this._json.summary;
  }

  hasHeaders(): boolean {
    return !!this._json.headers;
  }

  headers(): Record<string, any> | undefined {
    return this._json.headers;
  }

  hasPayload(): boolean {
    return !!this._json.payload;
  }

  payload(): Record<string, any> | undefined {
    return this._json.payload;
  }
}
