import type { BaseModel } from './base';
import type { ChannelParametersInterface } from './channel-parameters';
import type { MessagesInterface } from './messages';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
import type { OperationsInterface } from './operations';
import type { ServersInterface } from './servers';

export interface ChannelInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
  id(): string;
  address(): string | null | undefined;
  servers(): ServersInterface;
  operations(): OperationsInterface;
  messages(): MessagesInterface;
  parameters(): ChannelParametersInterface;
}
