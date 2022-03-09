export class V2BaseModel {
  constructor(
    private readonly _json: Record<string, any>,
  ) {}

  json<T = Record<string, any>>(): T;
  json<T = any>(key: string | number): T;
  json(key?: string | number) {
    if (key === undefined) return this._json;
    if (!this._json) return;
    return this._json[String(key)];
  }
}
