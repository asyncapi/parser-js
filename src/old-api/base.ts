export abstract class Base<J = any, M extends Record<string, any> = Record<string, any>> {
  constructor(
    protected readonly _json: J, // TODO: Add error here like in original codebase
    protected readonly _meta: M = {} as M,
  ) {}

  json<T = J>(): T;
  json<K extends keyof J>(key: K): J[K];
  json(key?: keyof J) {
    if (key === undefined || typeof this._json !== 'object') return this._json;
    if (!this._json) return;
    return this._json[key];
  }
}
