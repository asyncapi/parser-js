import { BaseModel } from './base';
import { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';

export type SecuritySchemaType = 'userPassword' | 'apiKey' | 'X509' | 'symmetricEncryption' | 'asymmetricEncryption' | 'httpApiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'plain' | 'scramSha256' | 'scramSha512' | 'gssapi';


export interface SecuritySchemeInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    id(): string
    hasBearerFormat(): boolean;
    bearerFormat(): string | undefined;
    openIdConnectUrl(): string;
    scheme(): string | undefined;
    scopes(): string[];
    type(): SecuritySchemaType;
    in(): string | undefined;
}