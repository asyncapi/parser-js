import { BaseModel } from "../base";
import { Bindings } from "./bindings";
import { Binding } from "./binding";
import { Channel } from "./channel";
import { ChannelParameter } from "./channel-parameter";
import { CorrelationId } from "./correlation-id";
import { MessageTrait } from "./message-trait";
import { OperationTrait } from "./operation-trait";
import { Schema } from "./schema";
import { SecurityScheme } from "./security-scheme";
import { Server } from "./server";
import { ServerVariable } from "./server-variable";
import { extensions } from './mixins';
import type { BindingsInterface } from "../bindings";
import type { ComponentsInterface } from "../components";
import type { ExtensionsInterface } from "../extensions";
import type { Constructor } from "../utils";
import type { ServersInterface } from "models/servers";
import { Servers } from "./servers";
import { Channels } from "./channels";
import type { ChannelsInterface } from "models/channels";
import type { MessagesInterface } from "models/messages";
import type { SchemasInterface } from "models/schemas";
import type { ChannelParametersInterface } from "models/channel-parameters";
import type { ServerVariablesInterface } from "models/server-variables";
import type { OperationTraitsInterface } from "models/operation-traits";
import type { SecuritySchemesInterface } from "models/security-schemes";
import { Messages } from "./messages";
import { Schemas } from "./schemas";
import { ChannelParameters } from "./channel-parameters";
import { ServerVariables } from "./server-variables";
import { OperationTraits } from "./operation-traits";
import { MessageTraits } from "./message-traits";
import type { MessageTraitsInterface } from "models/message-traits";
import { SecuritySchemes } from "./security-schemes";
import { Collection } from "models/collection";
import { CorrelationIds } from "./correlation-ids";
import { tilde } from '../../utils';
import type { OperationsInterface } from "models/operations";
import type { OperationInterface } from "models/operation";
import { Operations } from "./operations";
import { Message } from "./message";
import type { v2 } from "../../spec-types";
import { ComponentsObject } from "spec-types/v2";

export class Components extends BaseModel<v2.ComponentsObject> implements ComponentsInterface {
  servers(): ServersInterface {
    return this.createCollection('servers', Servers, Server);
  }

  channels(): ChannelsInterface {
    return new Channels(
      Object.entries(this._json.channels || {}).map(([channelAddress, channel]) => 
        this.createModel(Channel, channel, { id: channelAddress, pointer: `/components/channels/${tilde(channelAddress)}` })
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

  protected createCollection<M extends Collection<any>, T extends BaseModel>(itemsName: keyof ComponentsObject, collectionModel: Constructor<M>, itemModel: Constructor<T>): M {
    const collectionItems: T[] = [];
    Object.entries(this._json[itemsName] || {}).forEach(([itemName, item]) => {
      collectionItems.push(this.createModel(itemModel, item as any, { id: itemName, pointer: `/components/${itemsName}/${itemName}` } as any))
    });

    return new collectionModel(collectionItems);
  }

  protected createBindings(itemsName: 'serverBindings' | 'channelBindings' | 'operationBindings' | 'messageBindings'): Record<string, BindingsInterface> {
    return Object.entries(this._json[itemsName] || {}).reduce((bindings, [name, item]) => {
      bindings[name] = new Bindings(
        Object.entries(item || {}).map(([protocol, binding]) => 
          this.createModel(Binding, binding, { protocol, pointer: `components/${itemsName}/${name}/${protocol}` })
        )
      );
      return bindings;
    }, {} as  Record<string, Bindings>);
  }
}
