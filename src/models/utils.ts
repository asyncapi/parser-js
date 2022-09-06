import type { BaseModel, ModelMetadata } from './base';
import type { DetailedAsyncAPI } from '../types';

export interface Constructor<T> extends Function {
  new (...any: any[]): T;
}

export type InferModelData<T> = T extends BaseModel<infer J> ? J : never;
export type InferModelMetadata<T> = T extends BaseModel<infer J, infer M> ? M : never;

export function createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & { asyncapi?: DetailedAsyncAPI } & InferModelMetadata<T>, parent?: BaseModel): T {
  return new Model(value, { ...meta, asyncapi: meta.asyncapi || parent?.meta().asyncapi });
}
