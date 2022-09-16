import type { BaseModel } from './base';
import type { DetailedAsyncAPI } from '../types';

export interface CollectionMetadata<T = any> {
  originalData?: Record<string, T>;
  asyncapi?: DetailedAsyncAPI;
  pointer?: string;
}

export abstract class Collection<T extends BaseModel = BaseModel, M extends Record<string, any> = {}> extends Array<T> {
  constructor(
    protected readonly collections: T[],
    protected readonly _meta: CollectionMetadata<T> & M = {} as CollectionMetadata<T> & M,
  ) {
    super(...collections);
  }

  abstract get(id: string): T | undefined;

  has(id: string): boolean {
    return typeof this.get(id) !== 'undefined';
  }

  all(): T[] {
    return this.collections;
  }

  isEmpty(): boolean {
    return this.collections.length === 0;
  }

  filterBy(filter: (item: T) => boolean): T[] {
    return this.collections.filter(filter);
  }

  filterByInUse(): T[] {
    return this.filterBy((item: T): boolean => {
      // In the case of using $ref to reference any item from components, it will be already resolved since references are resolved before parsing, and will use another pointer rather than /components/...
      return !item.meta().pointer.startsWith('/components'); 
    });
  }

  filterByNotInUse(): T[] {
    return this.filterBy((item: T): boolean => {
      // In the case of using $ref to reference any item from components, it will be already resolved since references are resolved before parsing, and will use another pointer rather than /components/...
      return item.meta().pointer.startsWith('/components'); 
    });
  }

  meta(): CollectionMetadata<T> & M;
  meta<K extends keyof (CollectionMetadata<T> & M)>(key: K): (CollectionMetadata<T> & M)[K];
  meta(key?: keyof (CollectionMetadata<T> & M)) {
    if (key === undefined) return this._meta;
    if (!this._meta) return;
    return this._meta[String(key)];
  }
}
