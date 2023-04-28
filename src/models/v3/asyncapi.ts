import { BaseModel } from '../base';

export class AsyncAPIDocument extends BaseModel {
  version(): string {
    return this._json.asyncapi;
  }
}
