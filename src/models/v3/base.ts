export class V3BaseModel {
  constructor(
    private readonly _json: Record<string, any>,
  ) {}

  json(key?: string | number): any {
    if (key === undefined) return this._json;
    if (!this._json) return;
    return this._json[String(key)];
  }
}
