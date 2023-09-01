import { BaseModel } from '../base';
import { Info } from './info';
import { Channels } from './channels';
import { Channel } from './channel';
import { Components } from './components';
import { Messages } from './messages';
import { Operations } from './operations';
import { Servers } from './servers';
import { Server } from './server';
import { SecuritySchemes } from './security-schemes';
import { SecurityScheme } from './security-scheme';
import { Schemas } from './schemas';

import { extensions } from './mixins';
import { traverseAsyncApiDocument, SchemaTypesToIterate } from '../../iterator';
import { tilde } from '../../utils';

import type { AsyncAPIDocumentInterface } from '../asyncapi';
import type { InfoInterface } from '../info';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';
import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';
import type { ComponentsInterface } from '../components';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { SchemasInterface } from '../schemas';
import type { SchemaInterface } from '../schema';
import type { SecuritySchemesInterface } from '../security-schemes';
import type { ExtensionsInterface } from '../extensions';

import type { v2 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v2.AsyncAPIObject> implements AsyncAPIDocumentInterface {
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
        this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` })
      )
    );
  }

  channels(): ChannelsInterface {
    return new Channels(
      Object.entries(this._json.channels || {}).map(([channelAddress, channel]) => 
        this.createModel(Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${tilde(channelAddress)}` })
      )
    );
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    this.channels().forEach(channel => operations.push(...channel.operations()));
    return new Operations(operations);
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    this.operations().forEach(operation => operation.messages().forEach(message => (
      !messages.some(m => m.json() === message.json()) && messages.push(message)
    )));
    return new Messages(messages);
  }

  schemas(): SchemasInterface {
    return this.__schemas(false);
  }

  securitySchemes(): SecuritySchemesInterface {
    return new SecuritySchemes(
      Object.entries(this._json.components?.securitySchemes || {}).map(([securitySchemeName, securityScheme]) => 
        this.createModel(SecurityScheme, securityScheme as v2.SecuritySchemeObject, { id: securitySchemeName, pointer: `/components/securitySchemes/${securitySchemeName}` })
      )
    );
  }

  components(): ComponentsInterface {
    return this.createModel(Components, this._json.components || {}, { pointer: '/components' });
  }

  allServers(): ServersInterface {
    const servers: ServerInterface[] = this.servers().all();
    this.components().servers().forEach(server => 
      !servers.some(s => s.json() === server.json()) && servers.push(server)
    );
    return new Servers(servers);
  }

  allChannels(): ChannelsInterface {
    const channels: ChannelInterface[] = this.channels().all();
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
