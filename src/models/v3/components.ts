import { BaseModel } from '../base';
import { Collection } from '../collection';

import { Bindings } from './bindings';
import { Binding } from './binding';
import { Channel } from './channel';
import { ChannelParameter } from './channel-parameter';
import { CorrelationId } from './correlation-id';
import { MessageTrait } from './message-trait';
import { OperationTrait } from './operation-trait';
import { OperationReply } from './operation-reply';
import { OperationReplyAddress } from './operation-reply-address';
import { Schema } from './schema';
import { SecurityScheme } from './security-scheme';
import { Server } from './server';
import { ServerVariable } from './server-variable';
import { extensions } from './mixins';
import { Servers } from '../servers';
import { Channels } from '../channels';
import { Messages } from '../messages';
import { Schemas } from '../schemas';
import { ChannelParameters } from '../channel-parameters';
import { ServerVariables } from '../server-variables';
import { OperationTraits } from '../operation-traits';
import { MessageTraits } from '../message-traits';
import { OperationReplies } from '../operation-replies';
import { OperationReplyAddresses } from '../operation-reply-addresses';
import { SecuritySchemes } from '../security-schemes';
import { CorrelationIds } from '../correlation-ids';
import { Operations } from '../operations';
import { Operation } from './operation';
import { Message } from './message';
import { ExternalDocumentations } from '../external-documentations';
import { ExternalDocumentation } from './external-documentation';
import { Tags } from '../tags';
import { Tag } from './tag';

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
import type { OperationRepliesInterface } from '../operation-replies';
import type { OperationReplyAddressesInterface } from '../operation-reply-addresses';
import type { OperationsInterface } from '../operations';
import type { ExternalDocumentationsInterface } from '../external-documentations';
import type { TagsInterface } from '../tags';

import type { v3 } from '../../spec-types';

export class Components extends BaseModel<v3.ComponentsObject> implements ComponentsInterface {
  servers(): ServersInterface {
    return this.createCollection('servers', Servers, Server);
  }

  channels(): ChannelsInterface {
    return this.createCollection('channels', Channels, Channel);
  }

  operations(): OperationsInterface {
    return this.createCollection('operations', Operations, Operation);
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

  operationTraits(): OperationTraitsInterface {
    return this.createCollection('operationTraits', OperationTraits, OperationTrait);
  }

  messageTraits(): MessageTraitsInterface {
    return this.createCollection('messageTraits', MessageTraits, MessageTrait);
  }

  replies(): OperationRepliesInterface {
    return this.createCollection('replies', OperationReplies, OperationReply);
  }

  replyAddresses(): OperationReplyAddressesInterface {
    return this.createCollection('replyAddresses', OperationReplyAddresses, OperationReplyAddress);
  }

  correlationIds(): CorrelationIds {
    return this.createCollection('correlationIds', CorrelationIds, CorrelationId);
  }

  securitySchemes(): SecuritySchemesInterface {
    return this.createCollection('securitySchemes', SecuritySchemes, SecurityScheme);
  }

  tags(): TagsInterface {
    return this.createCollection('tags', Tags, Tag);
  }

  externalDocs(): ExternalDocumentationsInterface {
    return this.createCollection('externalDocs', ExternalDocumentations, ExternalDocumentation);
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

  protected createCollection<M extends Collection<any>, T extends BaseModel>(itemsName: keyof v3.ComponentsObject, collectionModel: Constructor<M>, itemModel: Constructor<T>): M {
    const collectionItems: T[] = [];
    Object.entries(this._json[itemsName] || {}).forEach(([id, item]) => {
      collectionItems.push(this.createModel(itemModel, item as any, { id, pointer: `/components/${itemsName}/${tilde(id)}` } as any));
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
