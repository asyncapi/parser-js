export declare abstract class Base<J extends any = any, M extends Record<string, any> = Record<string, any>> {
    protected readonly _json: J;
    protected readonly _meta: M;
    constructor(_json: J, // TODO: Add error here like in original codebase
    _meta?: M);
    json<T = J>(): T;
    json<K extends keyof J>(key: K): J[K];
}
