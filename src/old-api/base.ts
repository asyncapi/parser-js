export abstract class Base<J extends any = any, M extends Record<string, any> = Record<string, any>> {
  constructor(
    protected readonly _json: J,
    protected readonly _meta: M = {} as M,
  ) {
    if (_json === undefined || _json === null) {
      throw new Error('Invalid JSON to instantiate the Base object.');
    }
  }

  json<T = J>(): T;
  json<K extends keyof J>(key: K): J[K];
  json(key?: keyof J) {
    if (key === undefined || typeof this._json !== 'object') return this._json;
    if (!this._json) return;
    return this._json[key];
  }
}
