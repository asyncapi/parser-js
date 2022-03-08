export class Base {
    constructor(_json, // TODO: Add error here like in original codebase
    _meta = {}) {
        this._json = _json;
        this._meta = _meta;
    }
    json(key) {
        if (key === undefined || typeof this._json !== 'object')
            return this._json;
        if (!this._json)
            return;
        return this._json[key];
    }
}
