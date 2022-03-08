import { BaseModel } from '../base';
import type { AsyncAPIDocumentInterface } from '../asyncapi';
import type { InfoInterface } from '../info';
import type { ServersInterface } from '../servers';
import type { ChannelsInterface } from '../channels';
import type { ComponentsInterface } from '../components';
import type { OperationsInterface } from '../operations';
import type { MessagesInterface } from '../messages';
import type { SchemasInterface } from '../schemas';
import type { SecuritySchemesInterface } from '../security-schemes';
import type { ExtensionsInterface } from '../extensions';
import type { v2 } from '../../spec-types';
export declare class AsyncAPIDocument extends BaseModel<v2.AsyncAPIObject> implements AsyncAPIDocumentInterface {
    version(): string;
    defaultContentType(): string | undefined;
    hasDefaultContentType(): boolean;
    info(): InfoInterface;
    servers(): ServersInterface;
    channels(): ChannelsInterface;
    operations(): OperationsInterface;
    messages(): MessagesInterface;
    schemas(): SchemasInterface;
    securitySchemes(): SecuritySchemesInterface;
    components(): ComponentsInterface;
    extensions(): ExtensionsInterface;
}
