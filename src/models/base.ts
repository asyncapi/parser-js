import { DetailedAsyncAPI, Constructor } from "../types";

export interface ModelMetadata<P = unknown> {
  asyncapi: DetailedAsyncAPI;
  pointer: string;
  parent: P | null;
}

export abstract class BaseModel {
  constructor(
    protected readonly _json: Record<string, any>,
    protected readonly _meta: ModelMetadata = {} as any,
  ) {}

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

  protected createModel<T>(Model: Constructor<T>, { value, pointer }: { value: any, pointer: string | number }): T {
    return new Model(value, { asyncapi: this._meta.asyncapi, parent: this, pointer: `${this._meta.pointer}/${pointer}` } as ModelMetadata);
  }

  protected createMapOfModel<T>(map: Record<string, unknown>, Model: Constructor<T>): Record<string, T> {
    const result: Record<string, T> = {};
    if (!map) return result;
  
    Object.entries(map).forEach(([key, value]) => {
      result[String(key)] = this.createModel(Model, { value, pointer: key });
    });
    return result;
  };

  protected createListOfModel<T>(array: Array<unknown>, Model: Constructor<T>): Array<T> {
    if (!array) return [];
    return array.map((value, pointer) => this.createModel(Model, { value, pointer }));
  };

  protected createModelByKey<T>(collection: Record<string, unknown>, key: string, Model: Constructor<T>): T | undefined;
  protected createModelByKey<T>(collection: Array<unknown>, index: number, Model: Constructor<T>): T | undefined;
  protected createModelByKey<T>(collection: Record<string, unknown> | Array<unknown>, pointer: string | number, Model: Constructor<T>): T | undefined {
    if (!collection) {
      return;
    }
    if (
      (typeof pointer === 'string' && !Array.isArray(collection)) ||
      (typeof pointer === 'number' && Array.isArray(collection))
    ) {
      const value = (collection as Record<string, unknown>)[pointer] as any;
      return value && this.createModel(Model, { value, pointer });
    }
    return;
  };
}
