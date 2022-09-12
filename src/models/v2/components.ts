import { BaseModel } from '../base';
import { Collection } from '../collection';

import { Bindings } from './bindings';
import { Binding } from './binding';
import { Channel } from './channel';
import { ChannelParameter } from './channel-parameter';
import { CorrelationId } from './correlation-id';
import { MessageTrait } from './message-trait';
import { OperationTrait } from './operation-trait';
import { Schema } from './schema';
import { SecurityScheme } from './security-scheme';
import { Server } from './server';
import { ServerVariable } from './server-variable';
import { extensions } from './mixins';
import { Servers } from './servers';
import { Channels } from './channels';
import { Messages } from './messages';
import { Schemas } from './schemas';
import { ChannelParameters } from './channel-parameters';
import { ServerVariables } from './server-variables';
import { OperationTraits } from './operation-traits';
import { MessageTraits } from './message-traits';
import { SecuritySchemes } from './security-schemes';
import { CorrelationIds } from './correlation-ids';
import { Operations } from './operations';
import { Message } from './message';

import { tilde } from '../../utils';

import type { BindingsInterface } from '../bindings';
import type { ComponentsInterface } from '../components';
import type { ExtensionsInterface } from '../extensions';
import type { Constructor } from '../utils';
import type { ServersInterface } from '../servers';
import type { ChannelsInterface } from '../channels';
import type { MessagesInterface } from '../messages';
import type { SchemasInterface } from '../schemas';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ServerVariablesInterface } from '../server-variables';
import type { OperationTraitsInterface } from '../operation-traits';
import type { SecuritySchemesInterface } from '../security-schemes';
import type { MessageTraitsInterface } from '../message-traits';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';

import type { v2 } from '../../spec-types';

export class Components extends BaseModel<v2.ComponentsObject> implements ComponentsInterface {
  servers(): ServersInterface {
    return this.createCollection('servers', Servers, Server);
  }

  channels(): ChannelsInterface {
    return new Channels(
      Object.entries(this._json.channels || {}).map(([channelAddress, channel]) => 
        this.createModel(Channel, channel as v2.ChannelObject, { id: channelAddress, address: '', pointer: `/components/channels/${tilde(channelAddress)}` })
      )
    );
  }

  messages(): MessagesInterface {
    return this.createCollection('messages', Messages, Message);
  }

  schemas(): SchemasInterface {
    return this.createCollection('schemas', Schemas, Schema);
  }

  channelParameters(): ChannelParametersInterface {
    return this.createCollection('parameters', ChannelParameters, ChannelParameter);
  }

  serverVariables(): ServerVariablesInterface {
    return this.createCollection('serverVariables', ServerVariables, ServerVariable);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    this.channels().forEach(channel => operations.push(...channel.operations().all()));
    return new Operations(operations);
  }

  operationTraits(): OperationTraitsInterface {
    return this.createCollection('operationTraits', OperationTraits, OperationTrait);
  }

  messageTraits(): MessageTraitsInterface {
    return this.createCollection('messageTraits', MessageTraits, MessageTrait);
  }

  correlationIds(): CorrelationIds {
    return this.createCollection('correlationIds', CorrelationIds, CorrelationId);
  }

  securitySchemes(): SecuritySchemesInterface {
    return this.createCollection('securitySchemes', SecuritySchemes, SecurityScheme);
  }

  serverBindings(): Record<string, BindingsInterface> {
    return this.createBindings('serverBindings');
  }

  channelBindings(): Record<string, BindingsInterface> {
    return this.createBindings('channelBindings');
  }

  operationBindings(): Record<string, BindingsInterface> {
    return this.createBindings('operationBindings');
  }

  messageBindings(): Record<string, BindingsInterface> {
    return this.createBindings('messageBindings');
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }

  isEmpty(): boolean {
    return Object.keys(this._json).length === 0;
  }

  protected createCollection<M extends Collection<any>, T extends BaseModel>(itemsName: keyof v2.ComponentsObject, collectionModel: Constructor<M>, itemModel: Constructor<T>): M {
    const collectionItems: T[] = [];
    Object.entries(this._json[itemsName] || {}).forEach(([id, item]) => {
      collectionItems.push(this.createModel(itemModel, item as any, { id, pointer: `/components/${itemsName}/${id}` } as any));
    });
    return new collectionModel(collectionItems);
  }

  protected createBindings(itemsName: 'serverBindings' | 'channelBindings' | 'operationBindings' | 'messageBindings'): Record<string, BindingsInterface> {
    return Object.entries(this._json[itemsName] || {}).reduce((bindings, [name, item]) => {
      const bindingsData = item || {};
      const asyncapi = this.meta('asyncapi');
      const pointer = `components/${itemsName}/${name}`;
      bindings[name] = new Bindings(
        Object.entries(bindingsData).map(([protocol, binding]) => 
          this.createModel(Binding, binding, { protocol, pointer: `${pointer}/${protocol}` })
        ),
        { originalData: bindingsData as any, asyncapi, pointer }
      );
      return bindings;
    }, {} as Record<string, BindingsInterface>);
  }
}
