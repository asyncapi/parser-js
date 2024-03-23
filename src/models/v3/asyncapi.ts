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
import { Bindings } from './bindings';
import { Tags } from './tags';

import { extensions } from './mixins';
import { tilde } from '../../utils';
import { schemasFromDocument } from '../utils';

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
import type { SchemasInterface } from '../schemas';
import type { OperationInterface } from '../operation';
import type { ChannelInterface } from '../channel';
import type { ServerInterface } from '../server';
import type { BindingsInterface } from 'models/bindings';
import type { ChannelParametersInterface } from 'models/channel-parameters';
import type { CorrelationIdsInterface } from 'models/correlation-ids';
import type { MessageTraitsInterface } from 'models/message-traits';
import type { OperationTraitsInterface } from 'models/operation-traits';
import type { ServerVariablesInterface } from 'models/server-variables';
import type { TagsInterface } from 'models/tags';
import type { Tag } from './tag';
import type { TagInterface } from 'models/tag';

import type { v3 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v3.AsyncAPIObject> implements AsyncAPIDocumentInterface {
  allSecuritySchemes(): SecuritySchemesInterface {
    return this.securitySchemes();
  }
  allServerVariables(): ServerVariablesInterface {
    const serverVariables: ServerVariablesInterface = this.components().serverVariables();
    this.servers().forEach(server => {
      server.variables().forEach(variable => {
        if (!serverVariables.has(variable.id())) {
          serverVariables.push(variable);
        }
      });
    });

    return serverVariables;
  }
  allParameters(): ChannelParametersInterface {
    const parameters: ChannelParametersInterface = this.components().channelParameters();
    this.channels().forEach(channel => {
      channel.parameters().forEach(parameter => {
        if (!parameters.includes(parameter)) {
          parameters.push(parameter);
        }
      });
    });
    return parameters;
  }

  allCorrelationIds(): CorrelationIdsInterface {
    const correlationIds: CorrelationIdsInterface = this.components().correlationIds();
    this.allMessages().forEach(message => {
      const correlationId = message.correlationId();
      if (correlationId) {
        correlationIds.push(correlationId);
      }
    });

    this.allMessageTraits().forEach(trait => {
      const correlationId = trait.correlationId();
      if (correlationId) {
        correlationIds.push(correlationId);
      }
    });

    return correlationIds;
  }
  allTags(): TagsInterface {
    const tags: TagInterface[] = Object.values(this.components().json().tags || {}) || [];
    this.info().tags().forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });

    this.servers().forEach(server => {
      server.tags().forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    this.channels().forEach(channel => {
      (channel.json().tags || []).forEach((tag: Tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    this.operations().forEach(operation => {
      operation.tags().forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    this.allOperationTraits().forEach(trait => {
      trait.tags().forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    this.allMessages().forEach(message => {
      message.tags().forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    this.allMessageTraits().forEach(trait => {
      trait.tags().forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    return new Tags(tags);
  }
  allOperationTraits(): OperationTraitsInterface {
    const traits: OperationTraitsInterface = this.components().operationTraits();
    this.operations().forEach(operation => {
      operation.traits().forEach(trait => {
        if (!traits.includes(trait)) {
          traits.push(trait);
        }
      });
    });
    return traits;
  }
  allMessageTraits(): MessageTraitsInterface {
    const messageTraits: MessageTraitsInterface = this.components().messageTraits();
    this.allMessages().forEach(message => {
      message.traits().forEach(trait => {
        if (!messageTraits.includes(trait)) {
          messageTraits.push(trait);
        }
      });
    });
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

  schemas(): SchemasInterface {
    return schemasFromDocument(this, Schemas, false);
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
    const operations: OperationInterface[] = this.operations().all();
    this.components().operations().forEach(operation => 
      !operations.some(o => o.json() === operation.json()) && operations.push(operation)
    );
    return new Operations(operations);
  }

  allMessages(): MessagesInterface {
    const messages: MessageInterface[] = this.messages().all();
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
