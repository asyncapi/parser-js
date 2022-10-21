import { Channels } from '../channels';
import { Channel } from './channel';
import { Operations } from '../operations';
import { MessageTraits } from '../message-traits';
import { MessageTrait } from './message-trait';
import { Servers } from '../servers';
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
    return this.createModel(Schema, this._json.payload, { pointer: `${this._meta.pointer}/payload` });
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const serversData: any[] = [];
    this.channels().forEach(channel => {
      channel.servers().forEach(server => {
        if (!serversData.includes(server.json())) {
          serversData.push(server.json());
          servers.push(server);
        }
      });
    });
    return new Servers(servers);
  }

  channels(): ChannelsInterface {
    const channels: ChannelInterface[] = [];
    Object.entries((this._meta.asyncapi?.parsed?.channels || {}) as v3.ChannelsObject).forEach(([channelName, channel]) => {
      const hasMessage = Object.entries(channel.messages || {}).some(([, message]) => message === this._json);
      if (hasMessage) {
        channels.push(
          this.createModel(Channel, channel, { id: channelName, pointer: `/channels/${channelName}` }),
        );
      }
    });
    Object.entries((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.operations || {}).forEach(([operationId, operation]) => {
      const operationChannel = operation.channel as v3.ChannelObject | undefined;
      if (!channels.some(channel => channel.json() === operationChannel)) {
        const hasMessage = Object.entries(operationChannel?.messages || {}).some(([, message]) => message === this._json);
        if (hasMessage) {
          channels.push(
            this.createModel(Channel, operationChannel as v3.ChannelObject, { id: '', pointer: `/operations/${operationId}/channel` }),
          );
        }
      }
    });
    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    this.channels().forEach(channel => {
      operations.push(...channel.operations());
    });
    return new Operations(operations);
  }

  traits(): MessageTraitsInterface {
    return new MessageTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(MessageTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}` });
      })
    );
  }
}
