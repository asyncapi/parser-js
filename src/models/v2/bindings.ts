import { Collection } from "../collection";

import type { BindingsInterface } from "../bindings";
import type { BindingInterface } from "../binding";

export class Bindings extends Collection<BindingInterface> implements BindingsInterface {
  override get(name: string): BindingInterface | undefined {
    return this.collections.find(binding => binding.protocol() === name);
  };

  override has(name: string): boolean {
    return this.collections.some(binding => binding.protocol() === name);
  };
}
