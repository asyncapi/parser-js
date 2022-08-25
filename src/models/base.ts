import type { Constructor } from "./utils";
import type { DetailedAsyncAPI } from "../types";

export interface ModelMetadata {
  asyncapi: DetailedAsyncAPI;
  pointer: string;
  [key: string]: any;
}

export abstract class BaseModel<J extends Record<string, any> = Record<string, any>, M extends Record<string, any> = {}> {
  constructor(
    protected readonly _json: J,
    protected readonly _meta: ModelMetadata & M = {} as any,
  ) {}

  json<T extends Record<string, any> = J>(): T;
  json<K extends keyof J>(key: K): J[K];
  json(key?: keyof J) {
    if (key === undefined) return this._json;
    if (!this._json) return;
    return this._json[String(key)];
  }

  meta(): ModelMetadata {
    return this._meta!;
  }

  jsonPath(field?: string | undefined): string {
    if (typeof field !== 'string') {
      return this._meta.pointer;
    }
    return `${this._meta.pointer}/${field}`;
  }

  protected createModel<T extends BaseModel>(Model: Constructor<T>, value: any, meta: { pointer: string | number, [key: string]: any }): T {
    return new Model(value, { ...meta, asyncapi: this._meta.asyncapi });
  }
}
