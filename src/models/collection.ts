import type { BaseModel } from "./base";

export abstract class Collection<T extends BaseModel | Collection<any>> extends Array<T> {
  constructor(
    protected readonly collections: T[]
  ) {
    super(...collections);
  }

  abstract get(id: string): T | undefined;
  abstract has(id: string): boolean;

  all(): T[] {
    return this.collections;
  }

  isEmpty(): boolean {
    return this.collections.length === 0;
  }

  filterBy(filter: (item: T) => boolean): T[] {
    return this.collections.filter(filter);
  }
}
