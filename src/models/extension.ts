import type { BaseModel } from './base';

export interface ExtensionInterface<T = any> extends BaseModel {
  name(): string;
  version(): string;
  value<V = T>(): V;
}
