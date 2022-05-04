import type { BaseModel } from "./base";
import type { ChannelParametersInterface } from "./channel-parameters";
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface } from "./mixins";
import type { OperationsInterface } from "./operations";
import type { ServersInterface } from "./servers";

export interface ChannelInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface {
  id(): string;
  address(): string;
  servers(): ServersInterface;
  operations(): OperationsInterface;
  parameters(): ChannelParametersInterface;
}
