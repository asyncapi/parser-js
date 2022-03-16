import { DetailedAsyncAPI, Constructor } from "../types";

export interface ModelMetadata<P = unknown> {
  asyncapi: DetailedAsyncAPI;
  pointer: string;
  parent: P | null;
}

export abstract class BaseModel {
  protected readonly _meta: ModelMetadata;

  constructor(
    protected readonly _json: Record<string, any>,
    metadata: ModelMetadata = {} as any,
  ) {
    this._meta = {
      ...metadata,
    }
  }

  json<T = Record<string, any>>(): T;
  json<T = any>(key: string | number): T;
  json(key?: string | number) {
    if (key === undefined) return this._json;
    if (!this._json) return;
    return this._json[String(key)];
  }

  meta(): ModelMetadata {
    return this._meta!;
  }

  jsonPath(field?: string): string | undefined {
    if (typeof field !== 'string') {
      return this._meta?.pointer;
    }
    return `${this._meta?.pointer}/${field}`;
  }

  protected createModel<T>(Model: Constructor<T>, json: any, field: string | number): T {
    return new (Model as any)(json, { asyncapi: this._meta?.asyncapi, parent: this, pointer: `${this._meta?.pointer}/${field}` } as ModelMetadata);
  }

  protected createMapOfModel<T>(map: Record<string, unknown>, Model: Constructor<T>): Record<string, T> {
    const result: Record<string, T> = {};
    if (!map) return result;
  
    Object.entries(map).forEach(([key, value]) => {
      result[String(key)] = this.createModel(Model, value, key);
    });
    return result;
  };

  protected createListOfModel<T>(array: Array<unknown>, Model: Constructor<T>): Array<T> {
    if (!array) return [];
    return array.map((item, index) => this.createModel(Model, item, index));
  };

  protected createModelByKey<T>(collection: Record<string, unknown>, key: string, Model: Constructor<T>): T | undefined;
  protected createModelByKey<T>(collection: Array<unknown>, index: number, Model: Constructor<T>): T | undefined;
  protected createModelByKey<T>(collection: Record<string, unknown> | Array<unknown>, keyOrIndex: string | number, Model: Constructor<T>): T | undefined {
    if (!collection) {
      return;
    }
    if (
      (typeof keyOrIndex === 'string' && !Array.isArray(collection)) ||
      (typeof keyOrIndex === 'number' && Array.isArray(collection))
    ) {
      const value = (collection as Record<string, unknown>)[keyOrIndex] as any;
      return value && this.createModel(Model, value, keyOrIndex);
    }
    return;
  };
}
