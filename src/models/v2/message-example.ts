import { BaseModel } from "../base";

import { extensions } from './mixins';

import type { ExtensionsInterface } from "../extensions";
import type { MessageExampleInterface } from "../message-example";

import type { v2 } from "../../spec-types";

export class MessageExample extends BaseModel<v2.MessageExampleObject> implements MessageExampleInterface {
  hasName(): boolean {
    return !!this._json.name;
  }

  name(): string | undefined {
    return this._json.name;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string | undefined {
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

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
