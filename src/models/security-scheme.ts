import type { BaseModel } from './base';
import type { OAuthFlowsInterface } from './oauth-flows';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';

export type SecuritySchemaType = 'userPassword' | 'apiKey' | 'X509' | 'symmetricEncryption' | 'asymmetricEncryption' | 'httpApiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'plain' | 'scramSha256' | 'scramSha512' | 'gssapi';

export interface SecuritySchemeInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
  id(): string
  hasBearerFormat(): boolean;
  bearerFormat(): string | undefined;
  openIdConnectUrl(): string | undefined;
  scheme(): string | undefined;
  flows(): OAuthFlowsInterface | undefined;
  type(): SecuritySchemaType;
  in(): string | undefined;
}
