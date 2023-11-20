import type { BaseModel, ModelMetadata } from './base';
import type { DetailedAsyncAPI } from '../types';
import { SchemaInterface } from './schema';
import { SchemaTypesToIterate, traverseAsyncApiDocument } from '../iterator';
import { AsyncAPIDocumentInterface } from './asyncapi';
import { SchemasInterface } from '../models';

export interface Constructor<T> extends Function {
  new(...any: any[]): T;
}

export type InferModelData<T> = T extends BaseModel<infer J> ? J : never;
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export type InferModelMetadata<T> = T extends BaseModel<infer _, infer M> ? M : never;

export function createModel<T extends BaseModel>(Model: Constructor<T>, value: InferModelData<T>, meta: Omit<ModelMetadata, 'asyncapi'> & { asyncapi?: DetailedAsyncAPI } & InferModelMetadata<T>, parent?: BaseModel): T {
  return new Model(value, { ...meta, asyncapi: meta.asyncapi || parent?.meta().asyncapi });
}

export function schemasFromDocument<T extends SchemasInterface>(document: AsyncAPIDocumentInterface, SchemasModel: Constructor<T>, includeComponents: boolean): T {
  const jsonInstances: Set<any> = new Set();
  const schemas: Set<SchemaInterface> = new Set();

  function callback(schema: SchemaInterface) {
    // comparing the reference (and not just the value) to the .json() object
    if (!jsonInstances.has(schema.json())) {
      jsonInstances.add(schema.json());
      schemas.add(schema); // unique schemas 
    }
  }

  let toIterate = Object.values(SchemaTypesToIterate);
  if (!includeComponents) {
    toIterate = toIterate.filter(s => s !== SchemaTypesToIterate.Components);
  }
  traverseAsyncApiDocument(document, callback, toIterate);

  return new SchemasModel(Array.from(schemas));
}
