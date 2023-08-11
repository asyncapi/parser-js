import { BaseModel } from '../base';
import { Info } from './info';
import { Servers } from './servers';
import { Server } from './server';
import { Channels } from './channels';
import { Channel } from './channel';
import { Operations } from './operations';
import { Operation } from './operation';
import { Messages } from './messages';
import { SecuritySchemes } from './security-schemes';
import { SecurityScheme } from './security-scheme';
import { Components } from './components';
import { Schemas } from './schemas';

import { extensions } from './mixins';
import { tilde } from '../../utils';
import { SchemaTypesToIterate, traverseAsyncApiDocument } from '../../iterator';

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
import type { SchemaInterface } from 'models/schema';
import type { SchemasInterface } from 'models/schemas';
import type { v3 } from '../../spec-types';
import { OperationInterface } from 'models/operation';
import { ChannelInterface } from 'models/channel';
import { ServerInterface } from 'models/server';

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
        this.createModel(Server, server as v3.ServerObject, { id: serverName, pointer: `/servers/${tilde(serverName)}` })
      )
    );
  }

  channels(): ChannelsInterface {
    return new Channels(
      Object.entries(this._json.channels || {}).map(([channelId, channel]) =>
        this.createModel(Channel, channel as v3.ChannelObject, { id: channelId, pointer: `/channels/${tilde(channelId)}` })
      )
    );
  }

  operations(): OperationsInterface {    
    return new Operations(
      Object.entries(this._json.operations || {}).map(([operationId, operation]) =>
        this.createModel(Operation, operation as v3.OperationObject, { id: operationId, pointer: `/operations/${tilde(operationId)}` })
      )
    );
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    const messagesData: any[] = [];
    this.channels().forEach(channel => {
      channel.messages().forEach(message => {
        const messageData = message.json();
        if (!messagesData.includes(messageData)) {
          messagesData.push(messageData);
          messages.push(message);
        }
      });
    });
    return new Messages(messages);
  }

  schemas() {
    return this.__schemas(false);
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

  allServers(): ServersInterface {
    const servers: ServerInterface[] = this.servers();
    this.components().servers().forEach(server => 
      !servers.some(s => s.json() === server.json()) && servers.push(server)
    );
    return new Servers(servers);
  }

  allChannels(): ChannelsInterface {
    const channels: ChannelInterface[] = this.channels();
    this.components().channels().forEach(channel => 
      !channels.some(c => c.json() === channel.json()) && channels.push(channel)
    );
    return new Channels(channels);
  }

  allOperations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    this.allChannels().forEach(channel => operations.push(...channel.operations()));
    return new Operations(operations);
  }

  allMessages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    this.allOperations().forEach(operation => operation.messages().forEach(message => (
      !messages.some(m => m.json() === message.json()) && messages.push(message)
    )));
    this.components().messages().forEach(message => (
      !messages.some(m => m.json() === message.json()) && messages.push(message)
    ));
    return new Messages(messages);
  }

  allSchemas(): SchemasInterface {
    return this.__schemas(true);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }

  private __schemas(withComponents: boolean) {
    const schemas: Set<SchemaInterface> = new Set();
    function callback(schema: SchemaInterface) {
      if (!schemas.has(schema.json())) {
        schemas.add(schema);
      }
    }

    let toIterate = Object.values(SchemaTypesToIterate);
    if (!withComponents) {
      toIterate = toIterate.filter(s => s !== SchemaTypesToIterate.Components);
    }
    traverseAsyncApiDocument(this, callback, toIterate);
    return new Schemas(Array.from(schemas));
  }
}
