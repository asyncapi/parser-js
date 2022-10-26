import { BaseModel } from '../base';
import { Info } from './info';
import { Servers } from '../servers';
import { Server } from './server';
import { Channels } from '../channels';
import { Channel } from './channel';
import { Operations } from '../operations';
import { Operation } from './operation';
import { Messages } from '../messages';
import { SecuritySchemes } from '../security-schemes';
import { SecurityScheme } from './security-scheme';
import { Components } from './components';

import { extensions } from './mixins';
import { tilde } from '../../utils';

import type { AsyncAPIDocumentInterface } from '../asyncapi';
import type { InfoInterface } from '../info';
import type { ServersInterface } from '../servers';
import type { ChannelsInterface } from '../channels';
import type { OperationsInterface } from '../operations';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { ComponentsInterface } from '../components';
import type { SecuritySchemesInterface } from '../security-schemes';
import type { ExtensionsInterface } from '../extensions';

import type { v3 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v3.AsyncAPIObject> implements AsyncAPIDocumentInterface {
  version(): string {
    return this._json.asyncapi;
  }

  defaultContentType(): string | undefined {
    return this._json.defaultContentType;
  }

  hasDefaultContentType(): boolean {
    return !!this._json.defaultContentType;
  }

  info(): InfoInterface {
    return this.createModel(Info, this._json.info, { pointer: '/info' });
  }

  servers(): ServersInterface {
    return new Servers(
      Object.entries(this._json.servers || {}).map(([serverName, server]) => 
        this.createModel(Server, server, { id: serverName, pointer: `/servers/${tilde(serverName)}` })
      )
    );
  }

  channels(): ChannelsInterface {
    return new Channels(
      Object.entries(this._json.channels || {}).map(([channelId, channel]) =>
        this.createModel(Channel, channel, { id: channelId, pointer: `/channels/${tilde(channelId)}` })
      )
    );
  }

  operations(): OperationsInterface {    
    return new Operations(
      Object.entries(this._json.operations || {}).map(([operationId, operation]) =>
        this.createModel(Operation, operation, { id: operationId, pointer: `/operations/${tilde(operationId)}` })
      )
    );
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    const messagesData: any[] = [];
    this.channels().forEach(channel => {
      channel.messages().forEach(message => {
        if (!messagesData.includes(message.json())) {
          messagesData.push(message.json());
          messages.push(message);
        }
      });
    });
    return new Messages(messages);
  }

  schemas() {
    return null as any;
  }

  securitySchemes(): SecuritySchemesInterface {
    return new SecuritySchemes(
      Object.entries(this._json.components?.securitySchemes || {}).map(([securitySchemeName, securityScheme]) => 
        this.createModel(SecurityScheme, securityScheme as v3.SecuritySchemeObject, { id: securitySchemeName, pointer: `/components/securitySchemes/${securitySchemeName}` })
      )
    );
  }

  components(): ComponentsInterface {
    return this.createModel(Components, this._json.components || {}, { pointer: '/components' });
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
