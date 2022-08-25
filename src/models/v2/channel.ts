import { BaseModel } from "../base";
import { ChannelParameters } from './channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from './messages';
import { Operations } from './operations';
import { Operation } from './operation';
import { Servers } from './servers';
import { Server } from './server';

import { bindings, hasDescription, description, extensions } from './mixins';

import type { BindingsInterface } from "models/bindings";
import type { ChannelInterface } from "../channel";
import type { ChannelParametersInterface } from "../channel-parameters";
import type { ExtensionsInterface } from "models/extensions";
import type { MessagesInterface } from "../messages";
import type { MessageInterface } from "../message";
import type { OperationsInterface } from "../operations";
import type { OperationInterface } from "../operation";
import type { ServersInterface } from "../servers";
import type { ServerInterface } from "../server";

import type { v2 } from "../../interfaces";

export class Channel extends BaseModel<v2.ChannelObject, { id: string, address: string }> implements ChannelInterface {
  id(): string {
    return this._meta.id;
  }

  address(): string {
    return this._meta.address;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
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
    ['publish', 'subscribe'].forEach(operationAction => {
      this._json[operationAction as 'publish' | 'subscribe'] && operations.push(
        this.createModel(Operation, this._json[operationAction as 'publish' | 'subscribe'], { id: operationAction, action: operationAction, pointer: `${this._meta.pointer}/${operationAction}` }),
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

  bindings(): BindingsInterface {
    return bindings(this); 
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
