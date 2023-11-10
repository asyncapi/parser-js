import type { BaseModel, ModelMetadata } from './base';
import type { DetailedAsyncAPI } from '../types';

export interface Constructor<T> extends Function {
  new (...any: any[]): T;
}

export type InferModelData<T> = T extends BaseModel<infer J> ? J : never;
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export type InferModelMetadata<T> = T extends BaseModel<infer _, infer M> ? M : never;

export function createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & { asyncapi?: DetailedAsyncAPI } & InferModelMetadata<T>, parent?: BaseModel): T {
  return new Model(value, { ...meta, asyncapi: meta.asyncapi || parent?.meta().asyncapi });
}

export function objectIdFromJSONPointer(path: string, data: any): string {
  if (typeof data === 'string') {
    data = JSON.parse(data); 
  }

  if (!path.endsWith('/$ref')) path += '/$ref';

  path = path.replace(/^\//, ''); // removing the leading slash
  path.split('/').forEach((subpath) => {
    const key = subpath.replace(/~1/, '/'); // recover escaped slashes
    if (data[key] !== undefined) {
      data = data[key];
    }
  });
  
  return data.split('/').pop().replace(/~1/, '/');
}
