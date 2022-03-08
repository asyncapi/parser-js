import type { BaseModel, ModelMetadata } from './base';
import type { DetailedAsyncAPI } from '../types';
export interface Constructor<T> extends Function {
    new (...any: any[]): T;
}
export declare type InferModelData<T> = T extends BaseModel<infer J> ? J : never;
export declare type InferModelMetadata<T> = T extends BaseModel<infer _, infer M> ? M : never;
export declare function createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & {
    asyncapi?: DetailedAsyncAPI;
} & InferModelMetadata<T>, parent?: BaseModel): T;
