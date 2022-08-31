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

  meta(): ModelMetadata & M;
  meta<K extends keyof ModelMetadata & M>(key: K): (ModelMetadata & M)[K];
  meta(key?: keyof ModelMetadata & M) {
    if (key === undefined) return this._meta;
    if (!this._meta) return;
    return this._meta[String(key)];
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
