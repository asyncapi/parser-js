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
    private readonly _id: string,
    _json: Record<string,any>,
    protected readonly _meta: ModelMetadata & { address: string } = {} as any
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._id
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
    const operations: OperationInterface[] = []
    if (this._json.publish) {
      operations.push(
        this.createModel(Operation, this._json.publish, { id: 'publish', action: 'publish', pointer: `${this._meta.pointer}/publish` }),
      );
    }
    if (this._json.subscribe) {
      operations.push(
        this.createModel(Operation, this._json.subscribe, { id: 'subscribe', action: 'subscribe', pointer: `${this._meta.pointer}/subscribe` }),
      );
    }
    return new Operations(operations);
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
