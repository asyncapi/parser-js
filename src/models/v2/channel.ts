import { BaseModel } from "../base";
import { ChannelParameters } from './channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from './messages';
import { Operations } from './operations';
import { Operation } from './operation';
import { Servers } from './servers';
import { Server } from './server';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from "../base";
import type { ChannelInterface } from "../channel";
import type { ChannelParametersInterface } from "../channel-parameters";
import type { MessagesInterface } from "../messages";
import type { MessageInterface } from "../message";
import type { OperationsInterface } from "../operations";
import type { OperationInterface } from "../operation";
import type { ServersInterface } from "../servers";
import type { ServerInterface } from "../server";

export class Channel extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin) implements ChannelInterface {
  constructor(
    _json: Record<string,any>,
    protected readonly _meta: ModelMetadata & { id: string, address: string } = {} as any
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._meta.id;
  }

  address(): string {
    return this._meta.address;
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const allowedServers: string[] = this._json.servers || [];
    Object.entries(this._meta.asyncapi?.parsed.servers || {}).map(([serverName, server]) => {
      if (allowedServers.length === 0 || allowedServers.includes(serverName)) {
        servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
      }
    });
    return new Servers(servers);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    ['publish', 'subscribe'].forEach(operationKind => {
      this._json[operationKind] && operations.push(
        this.createModel(Operation, this._json[operationKind], { id: operationKind, action: operationKind, pointer: `${this._meta.pointer}/${operationKind}` }),
      );
    });
    return new Operations(operations);
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    this.operations().forEach(operation => messages.push(...operation.messages().all()));
    return new Messages(messages);
  }

  parameters(): ChannelParametersInterface {
    return new ChannelParameters(
      Object.entries(this._json.parameters || {}).map(([channelParameterName, channelParameter]) => {
        return this.createModel(ChannelParameter, channelParameter, {
          id: channelParameterName,
          pointer: `${this._meta.pointer}/parameters/${channelParameterName}`
        })
      })
    );
  }
}
