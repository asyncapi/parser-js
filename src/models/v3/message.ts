import { Channels } from './channels';
import { Operations } from './operations';
import { Operation } from './operation';
import { MessageTraits } from './message-traits';
import { MessageTrait } from './message-trait';
import { Servers } from './servers';
import { Schema } from './schema';

import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';
import type { MessageInterface } from '../message';
import type { MessageTraitsInterface } from '../message-traits';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';
import type { SchemaInterface } from '../schema';

import type { v3 } from '../../spec-types';

export class Message extends MessageTrait<v3.MessageObject> implements MessageInterface {
  hasPayload(): boolean {
    return !!this._json.payload;
  }
  
  payload(): SchemaInterface | undefined {
    if (!this._json.payload) return undefined;
    return this.createModel(Schema, this._json.payload, { pointer: this.jsonPath('payload')});
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const serversData: any[] = [];
    this.channels().forEach(channel => {
      channel.servers().forEach(server => {
        const serverData = server.json();
        if (!serversData.includes(serverData)) {
          serversData.push(serverData);
          servers.push(server);
        }
      });
    });
    return new Servers(servers);
  }

  channels(): ChannelsInterface {
    const channels: ChannelInterface[] = [];
    const channelData: any[] = [];
    this.operations().forEach(operation => {
      operation.channels().forEach(channel => {
        const channelsData = channel.json();
        if (!channelData.includes(channelsData)) {
          channelData.push(channelsData);
          channels.push(channel);
        }
      });
    });
    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    Object.entries((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.operations || {}).forEach(([operationId, operation]) => {
      const operationModel = this.createModel(Operation, operation as v3.OperationObject, { id: operationId, pointer: `/operations/${operationId}` });
      if (operationModel.messages().some(m => m.json() === this._json)) {
        operations.push(operationModel);
      }
    });
    return new Operations(operations);
  }

  traits(): MessageTraitsInterface {
    return new MessageTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(MessageTrait, trait, { id: '', pointer: this.jsonPath(`traits/${index}`) });
      })
    );
  }
}
