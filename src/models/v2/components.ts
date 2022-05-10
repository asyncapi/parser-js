import { BaseModel } from "../base";
import { Channel } from "./channel";
import { ChannelParameter } from "./channel-parameter";
import { CorrelationId } from "./correlation-id";
import { Message } from "./message";
import { MessageTrait } from "./message-trait";
import { Operation } from "./operation";
import { OperationTrait } from "./operation-trait";
import { Schema } from "./schema";
import { SecurityScheme } from "./security-scheme";
import { Server } from "./server";
import { ServerVariable } from "./server-variable";

import { Mixin } from '../utils';
import { Bindings, Binding } from "./mixins/bindings";
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentation } from './mixins/external-docs';
import { Tag } from './mixins/tags';

import type { BindingsInterface } from "../bindings";
import type { ComponentsInterface } from "../components";
import type { ChannelInterface } from "../channel";
import type { ChannelParameterInterface } from "../channel-parameter";
import type { CorrelationIdInterface } from "../correlation-id";
import type { ExternalDocumentationInterface } from "../external-docs";
import type { TagInterface } from "../tag";
import type { MessageInterface } from "../message";
import type { MessageTraitInterface } from "../message-trait";
import type { OperationInterface } from "../operation";
import type { OperationTraitInterface } from "../operation-trait";
import type { SchemaInterface } from "../schema";
import type { SecuritySchemeInterface } from "../security-scheme";
import type { ServerInterface } from "../server";
import type { ServerVariableInterface } from "../server-variable";
import type { Constructor } from "../utils";

export class Components extends Mixin(BaseModel, ExtensionsMixin) implements ComponentsInterface {
  servers(): Record<string, ServerInterface> {
    return this.createMap('servers', Server);
  }

  channels(): Record<string, ChannelInterface> {
    return this.createMap('channels', Channel);
  }

  operations(): Record<string, OperationInterface> {
    return this.createMap('channels', Operation);
  }

  messages(): Record<string, MessageInterface> {
    return this.createMap('messages', Message);
  }

  schemas(): Record<string, SchemaInterface> {
    return this.createMap('schemas', Schema);
  }

  channelParameters(): Record<string, ChannelParameterInterface> {
    return this.createMap('parameters', ChannelParameter);
  }

  serverVariables(): Record<string, ServerVariableInterface> {
    return this.createMap('serverVariables', ServerVariable);
  }

  operationTraits(): Record<string, OperationTraitInterface> {
    return this.createMap('operationTraits', OperationTrait);
  }

  messageTraits(): Record<string, MessageTraitInterface> {
    return this.createMap('messageTraits', MessageTrait);
  }

  correlationIds(): Record<string, CorrelationIdInterface> {
    return this.createMap('correlationIds', CorrelationId);
  }

  externalDocs(): Record<string, ExternalDocumentationInterface> {
    return this.createMap('externalDocs', ExternalDocumentation);
  }

  tags(): Record<string, TagInterface> {
    return this.createMap('tags', Tag);
  }

  securitySchemes(): Record<string, SecuritySchemeInterface> {
    return this.createMap('securitySchemes', SecurityScheme);
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

  protected createMap<M extends BaseModel>(itemsName: string, model: Constructor<M>): Record<string, M> {
    return Object.entries(this._json[itemsName] || {}).reduce((items, [itemName, item]) => {
      items[itemName] = this.createModel(model, item, { id: itemName, pointer: `/components/${itemsName}/${itemName}` })
      return items;
    }, {} as Record<string, M>);
  }

  protected createBindings(itemsName: string): Record<string, BindingsInterface> {
    return Object.entries(this._json[itemsName] || {}).reduce((bindings, [name, item]) => {
      bindings[name] = new Bindings(
        Object.entries(item as any || {}).map(([protocol, binding]) => 
          this.createModel(Binding, binding, { id: protocol, pointer: `components/${itemsName}/${name}/${protocol}` })
        )
      );
      return bindings;
    }, {} as Record<string, BindingsInterface>);
  }
}
