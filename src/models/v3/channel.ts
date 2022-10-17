import { BaseModel } from '../base';
import { ChannelParameters } from '../channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from '../messages';
import { Operations } from '../operations';
import { Servers } from '../servers';
import { Server } from './server';

import { bindings, hasDescription, description, extensions } from './mixins';

import type { BindingsInterface } from '../bindings';
import type { ChannelInterface } from '../channel';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ExtensionsInterface } from '../extensions';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';

import type { v3 } from '../../spec-types';

export class Channel extends BaseModel<v3.ChannelObject, { id: string }> implements ChannelInterface {
  id(): string {
    return this._meta.id;
  }

  address(): string | null | undefined {
    return this._meta.address;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  servers(): ServersInterface {
    let allowedServers: v3.ServerObject[];
    if (Array.isArray(this._json.servers)) {
      allowedServers = this._json.servers || [];
    } else {
      const parsedAsyncAPI = this._meta.asyncapi.parsed as v3.AsyncAPIObject;
      allowedServers = parsedAsyncAPI.servers || [];
    }
    const servers: ServerInterface[] = allowedServers.map((server: v3.ServerObject) => new Server(server));
    return new Servers(servers);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    // ['publish', 'subscribe'].forEach(operationAction => {
    //   const id =  this._json[operationAction as 'publish' | 'subscribe'] && (this._json[operationAction as 'publish' | 'subscribe'] as v2.OperationObject).operationId || `${this.meta().id  }_${  operationAction}`;
    //   if (this._json[operationAction as 'publish' | 'subscribe']) {
    //     operations.push(
    //       this.createModel(Operation, this._json[operationAction as 'publish' | 'subscribe'] as v2.OperationObject, { id, action: operationAction as OperationAction, pointer: `${this._meta.pointer}/${operationAction}` }),
    //     );
    //   }
    // });
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
        return this.createModel(ChannelParameter, channelParameter as v3.ParameterObject, {
          id: channelParameterName,
          pointer: `${this._meta.pointer}/parameters/${channelParameterName}`
        });
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
