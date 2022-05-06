import { BaseModel } from "../../base";
import { Collection } from '../../collection';

import { Mixin } from '../../utils';
import { ExtensionsMixin } from './extensions';

import type { ModelMetadata } from "../../base";
import type { BindingsMixinInterface } from "../../mixins";
import type { BindingsInterface } from "../../bindings";
import type { BindingInterface } from "../../binding";

export class Binding extends Mixin(BaseModel, ExtensionsMixin) implements BindingInterface {
  constructor(
    _json: Record<string, any>,
    protected readonly _meta: ModelMetadata & { protocol: string } = {} as any,
  ) {
    super(_json, _meta);
  }

  protocol(): string {
    return this._meta.protocol;
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
      Object.entries(bindings).map(([protocol, binding]) => 
        this.createModel(Binding, binding, { id: protocol, pointer: `${this._meta.pointer}/bindings/${protocol}` })
      )
    );
  }
}
