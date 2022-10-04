import { BaseModel } from '../base';

import type { AsyncAPIDocumentInterface } from '../asyncapi';

import type { v3 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v3.AsyncAPIObject> implements AsyncAPIDocumentInterface {
  version(): string {
    return this._json.asyncapi;
  }

  defaultContentType(): string | undefined {
    return this._json.defaultContentType;
  }

  hasDefaultContentType(): boolean {
    return !!this._json.defaultContentType;
  }

  info() {
    return null as any;
  }

  servers() {
    return null as any;
  }

  channels() {
    return null as any;
  }

  operations() {
    return null as any;
  }

  messages() {
    return null as any;
  }

  schemas() {
    return null as any;
  }

  securitySchemes() {
    return null as any;
  }

  components() {
    return null as any;
  }

  extensions() {
    return null as any;
  }
}
