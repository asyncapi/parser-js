import { ChannelParameters } from '../channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from '../messages';
import { Operations } from '../operations';
import { Operation } from './operation';
import { Servers } from '../servers';
import { Server } from './server';

import { CoreModel } from './mixins';

import type { ChannelInterface } from '../channel';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { OperationsInterface } from '../operations';
import type { OperationAction, OperationInterface } from '../operation';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';

import type { v2 } from '../../spec-types';

export class Channel extends CoreModel<v2.ChannelObject, { id: string, address: string }> implements ChannelInterface {
  id(): string {
    return this._meta.id;
  }

  address(): string | null | undefined {
    return this._meta.address;
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const allowedServers: string[] = this._json.servers || [];
    Object.entries(this._meta.asyncapi?.parsed.servers || {}).forEach(([serverName, server]) => {
      if (allowedServers.length === 0 || allowedServers.includes(serverName)) {
        servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
      }
    });
    return new Servers(servers);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    ['publish', 'subscribe'].forEach(operationAction => {
      const id =  this._json[operationAction as 'publish' | 'subscribe'] && (this._json[operationAction as 'publish' | 'subscribe'] as v2.OperationObject).operationId || `${this.meta().id  }_${  operationAction}`;
      if (this._json[operationAction as 'publish' | 'subscribe']) {
        operations.push(
          this.createModel(Operation, this._json[operationAction as 'publish' | 'subscribe'] as v2.OperationObject, { id, action: operationAction as OperationAction, pointer: `${this._meta.pointer}/${operationAction}` }),
        );
      }
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
        return this.createModel(ChannelParameter, channelParameter as v2.ParameterObject, {
          id: channelParameterName,
          pointer: `${this._meta.pointer}/parameters/${channelParameterName}`
        });
      })
    );
  }
}