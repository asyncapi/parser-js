import { BaseModel } from "../base";

import { EXTENSION_REGEX } from '../../constants';

export interface SpecificationExtensionsMixinInterface {
  hasExtensions(): boolean;
  hasExtensions(name: string): boolean;
  extensions(): Record<string, any>;
  extensions(name: string): any;
}

export abstract class SpecificationExtensionsMixin extends BaseModel implements SpecificationExtensionsMixinInterface {
  hasExtensions(): boolean;
  hasExtensions(name: string): boolean;
  hasExtensions(name?: string): boolean {
    const extensions = this.extensions(name!);
    if (typeof name === 'string') {
      return Boolean(extensions);
    }
    return Object.keys(extensions || {}).length > 0;
  };

  extensions(): any[];
  extensions(name: string): any;
  extensions(name?: string): any | any[] {
    if (typeof name === 'string') {
      name = name.startsWith('x-') ? name : `x-${name}`;
      return this._json[name];
    }

    const result: Record<string, any> = {};
    Object.entries(this._json).forEach(([key, value]) => {
      if (EXTENSION_REGEX.test(key)) {
        result[String(key)] = value;
      }
    });
    return result;
  };
}
