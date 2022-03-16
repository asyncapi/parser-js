import { BaseModel } from "../base";

export interface TagsMixinInterface {
  hasTags(): boolean;
  hasTags(name: string): boolean;
  tags(): any[]; // TODO: Change type to Tag
  tags(name: string): any; // TODO: Change type to Tag
}

export abstract class TagsMixin extends BaseModel implements TagsMixinInterface {
  hasTags(): boolean;
  hasTags(name: string): boolean;
  hasTags(name?: string): boolean {
    if (!Array.isArray(this._json.tags) || !this._json.tags.length) {
      return false;
    }
    if (typeof name === 'string') {
      return this._json.tags.some((t: any) => t.name === name);
    }
    return true;
  };


  // TODO: return instance(s) of Tag model when the Tag class will be implemented 
  tags(): any[]; // TODO: Change type to Tag
  tags(name: string): any; // TODO: Change type to Tag
  tags(name?: string): any | any[] { // TODO: Change type to Tag
    if (typeof name === 'string') {
      if (Array.isArray(this._json.tags)) {
        return this._json.tags.find((t: any) => t.name === name);
      }
      return;
    }
    return this._json.tags || [];
  };
}
