import { BaseModel } from "../../base";
import { Collection } from '../../collection';

import { Mixin } from '../../utils';
import { ExtensionsMixin } from './extensions';

import type { BindingsMixinInterface } from "../../mixins";
import type { BindingsInterface } from "../../bindings";
import type { BindingInterface } from "../../binding";

export class Binding extends Mixin(BaseModel, ExtensionsMixin) implements BindingInterface {
  constructor(
    private readonly _protocol: string,
    _json: Record<string, any>,
  ) {
    super(_json);
  }

  protocol(): string {
    return this._protocol;
  }

  version(): string {
    return this._json.bindingVersion;
  }

  value(): any {
    const value = { ...this._json };
    delete value.bindingVersion;
    return value;
  }
}

export class Bindings extends Collection<BindingInterface> implements BindingsInterface {
  override get(name: string): BindingInterface | undefined {
    return this.collections.find(binding => binding.protocol() === name);
  };

  override has(name: string): boolean {
    return this.collections.some(binding => binding.protocol() === name);
  };
}

export abstract class BindingsMixin extends BaseModel implements BindingsMixinInterface {
  bindings(): BindingsInterface {
    const bindings: Record<string, any> = this._json.bindings || {};
    return new Bindings(
      Object.entries(bindings).map(([protocol, binding]) => new Binding(protocol, binding))
    );
  }
}