import type { Constructor, InferModelData, InferModelMetadata } from "./utils";
import type { DetailedAsyncAPI } from "../types";

export interface ModelMetadata {
  asyncapi: DetailedAsyncAPI;
  pointer: string;
}

export abstract class BaseModel<J extends any = any, M extends Record<string, any> = {}> {
  constructor(
    protected readonly _json: J,
    protected readonly _meta: ModelMetadata & M = {} as ModelMetadata & M,
  ) {}

  json<T = J>(): T;
  json<K extends keyof J>(key: K): J[K];
  json(key?: keyof J) {
    if (key === undefined) return this._json;
    if (this._json === null || this._json === undefined) return this._json;
    return this._json[key];
  }

  meta(): ModelMetadata & M;
  meta<K extends keyof (ModelMetadata & M)>(key: K): (ModelMetadata & M)[K];
  meta(key?: keyof (ModelMetadata & M)) {
    if (key === undefined) return this._meta;
    if (!this._meta) return;
    return this._meta[key];
  }

  jsonPath(field?: string | undefined): string {
    if (typeof field !== 'string') {
      return this._meta.pointer;
    }
    return `${this._meta.pointer}/${field}`;
  }

  protected createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & InferModelMetadata<T>): T {
    return new Model(value, { ...meta, asyncapi: this._meta.asyncapi });
  }
}
