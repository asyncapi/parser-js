import { ChannelParameters } from './channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from './messages';
import { Message } from './message';
import { Operations } from './operations';
import { Operation } from './operation';
import { Servers } from './servers';
import { Server } from './server';

import { CoreModel } from './mixins';

import type { ChannelInterface } from '../channel';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { MessagesInterface } from '../messages';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';

import type { v3 } from '../../spec-types';

export class Channel extends CoreModel<v3.ChannelObject, { id: string }> implements ChannelInterface {
  id(): string {
    return this._meta.id;
  }

  address(): string | null | undefined {
    return this._json.address;
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const allowedServers = this._json.servers || [];
    Object.entries(this._meta.asyncapi?.parsed.servers || {}).forEach(([serverName, server]) => {
      if (allowedServers.length === 0 || allowedServers.includes(server)) {
        servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
      }
    });
    return new Servers(servers);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    Object.entries(((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.operations || {})).forEach(([operationId, operation]) => {
      if ((operation as v3.OperationObject).channel === this._json) {
        operations.push(
          this.createModel(Operation, operation as v3.OperationObject, { id: operationId, pointer: `/operations/${operationId}` }),
        );
      }
    });
    return new Operations(operations);
  }

  messages(): MessagesInterface {
    return new Messages(
      Object.entries(this._json.messages || {}).map(([messageName, message]) => {
        return this.createModel(Message, message as v3.MessageObject, { id: messageName, pointer: this.jsonPath(`messages/${messageName}`) });
      })
    );
  }

  parameters(): ChannelParametersInterface {
    return new ChannelParameters(
      Object.entries(this._json.parameters || {}).map(([channelParameterName, channelParameter]) => {
        return this.createModel(ChannelParameter, channelParameter as v3.ParameterObject, {
          id: channelParameterName,
          pointer: this.jsonPath(`parameters/${channelParameterName}`),
        });
      })
    );
  }
}
