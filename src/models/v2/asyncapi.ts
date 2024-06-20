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
import { Bindings } from './bindings';

import { extensions, tags } from './mixins';
import { tilde } from '../../utils';
import { schemasFromDocument } from '../utils';

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
import type { SecuritySchemesInterface } from '../security-schemes';
import type { ExtensionsInterface } from '../extensions';
import type { BindingsInterface } from 'models/bindings';
import type { ChannelParametersInterface } from 'models/channel-parameters';
import type { CorrelationIdsInterface } from 'models/correlation-ids';
import type { MessageTraitsInterface } from 'models/message-traits';
import type { OperationTraitsInterface } from 'models/operation-traits';
import type { ServerVariablesInterface } from 'models/server-variables';
import type { TagsInterface } from 'models/tags';

import type { v2 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v2.AsyncAPIObject> implements AsyncAPIDocumentInterface {
  allSecuritySchemes(): SecuritySchemesInterface {
    return this.securitySchemes();
  }
  allServerVariables(): ServerVariablesInterface {
    const serverVariables: ServerVariablesInterface = this.components().serverVariables();
    this.allServers().forEach(server => serverVariables.push(...server.variables()));
    return serverVariables;
  }
  allParameters(): ChannelParametersInterface {
    const channelParameters: ChannelParametersInterface = this.components().channelParameters();
    this.allChannels().forEach(channel => channelParameters.push(...channel.parameters()));
    return channelParameters;
  }
  allCorrelationIds(): CorrelationIdsInterface {
    const correlationIds: CorrelationIdsInterface = this.components().correlationIds();
    this.allMessages().forEach(message => {
      message.traits().forEach(trait => {
        const correlationId = trait.correlationId();
        if (!correlationId) {
          return;
        }
        if (!correlationIds.includes(correlationId)) {
          correlationIds.push(correlationId);
        }
      });

      const correlationId = message.correlationId();
      if (!correlationId) {
        return;
      }
      if (!correlationIds.includes(correlationId)) {
        correlationIds.push(correlationId);
      }
    });
    return correlationIds;
  }
  allTags(): TagsInterface {
    const rootTags: TagsInterface = tags(this);
    this.allServers().forEach(server => rootTags.push(...server.tags()));
    this.allOperations().forEach(channel => rootTags.push(...channel.tags()));
    this.allOperationTraits().forEach(trait => rootTags.push(...trait.tags()));
    this.allMessages().forEach(message => rootTags.push(...message.tags()));
    this.allMessageTraits().forEach(trait => rootTags.push(...trait.tags()));
    return rootTags;
  }
  allOperationTraits(): OperationTraitsInterface {
    const operationTraits: OperationTraitsInterface = this.components().operationTraits();
    this.allOperations().forEach(operation => operation.traits().forEach(trait => (
      !operationTraits.some(t => t.json() === trait.json()) && operationTraits.push(trait)
    )));

    return operationTraits;
  }
  allMessageTraits(): MessageTraitsInterface {
    const messageTraits: MessageTraitsInterface = this.components().messageTraits();
    this.allMessages().forEach(message => message.traits().forEach(trait => (
      !messageTraits.some(t => t.json() === trait.json()) && messageTraits.push(trait)
    )));

    return messageTraits;
  }
  allServerBindings(): BindingsInterface {
    const serverBindings = Object.values(this.components().serverBindings()).flat();
    this.allServers().forEach(server => server.bindings().forEach(binding => (
      !serverBindings.some(b => b.json() === binding.json()) && serverBindings.push(binding)
    )));
    return new Bindings(serverBindings);
  }
  allChannelBindings(): BindingsInterface {
    const channelBindings = Object.values(this.components().channelBindings()).flat();
    this.allChannels().forEach(channel => channel.bindings().forEach(binding => (
      !channelBindings.some(b => b.json() === binding.json()) && channelBindings.push(binding)
    )));
    return new Bindings(channelBindings);
  }
  allOperationBindings(): BindingsInterface {
    const operationBindings = Object.values(this.components().operationBindings()).flat();
    this.allOperations().forEach(operation => operation.bindings().forEach(binding => (
      !operationBindings.some(b => b.json() === binding.json()) && operationBindings.push(binding)
    )));
    return new Bindings(operationBindings);
  }
  allMessageBindings(): BindingsInterface {
    const messageBindings = Object.values(this.components().messageBindings()).flat();
    this.allMessages().forEach(message => message.bindings().forEach(binding => (
      !messageBindings.some(b => b.json() === binding.json()) && messageBindings.push(binding)
    )));
    return new Bindings(messageBindings);
  }
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
    return schemasFromDocument(this, Schemas, false);
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
    return schemasFromDocument(this, Schemas, true);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
