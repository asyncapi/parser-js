import { BaseModel } from '../base';
export class AsyncAPIDocument extends BaseModel {
    version() {
        return this._json.asyncapi;
    }
}
