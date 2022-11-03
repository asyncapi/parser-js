import type { BaseModel } from './base';
import type { OAuthFlowsInterface } from './oauth-flows';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';

export interface SecuritySchemeInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
  id(): string;
  type(): string;
  name(): string | undefined;
  in(): string | undefined;
  scheme(): string | undefined;
  bearerFormat(): string | undefined;
  flows(): OAuthFlowsInterface | undefined;
  openIdConnectUrl(): string | undefined;
}
