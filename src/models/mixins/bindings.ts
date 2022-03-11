import { BaseModel } from "../base";

export interface BindingsMixinInterface {
  hasBindings(): boolean;
  hasBindings(protocol: string): boolean;
  bindings(): any[]; // TODO: Change type to Tag
  bindings(protocol: string): any; // TODO: Change type to Tag
}

export abstract class BindingsMixin extends BaseModel implements BindingsMixinInterface {
  hasBindings(): boolean;
  hasBindings(protocol: string): boolean;
  hasBindings(protocol?: string): boolean {
    const bindings = this.bindings(protocol!);
    if (typeof protocol === 'string') {
      return Boolean(bindings);
    }
    return Object.keys(bindings || {}).length > 0;
  };


  bindings(): any[];
  bindings(protocol: string): any;
  bindings(protocol?: string): any | any[] {
    if (typeof protocol === 'string') {
      if (this._json.bindings && typeof this._json.bindings === 'object') {
        return this._json.bindings[protocol];
      }
      return;
    }
    return this._json.bindings || {};
  };
}
