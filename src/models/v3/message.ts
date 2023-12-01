import { Channel } from './channel';
import { Channels } from './channels';
import { Operations } from './operations';
import { Operation } from './operation';
import { MessageTraits } from './message-traits';
import { MessageTrait } from './message-trait';
import { Servers } from './servers';
import { Schema } from './schema';
import { xParserObjectUniqueId } from '../../constants';
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

  hasSchemaFormat(): boolean {
    // If it has a payload, schema format is expected (at least the default)
    return this.hasPayload();
  }
  
  schemaFormat(): string | undefined {
    if (this.hasSchemaFormat()) {
      return this.payload()?.schemaFormat();
    }

    return undefined;
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
    const thisMessageId = (this._json)[xParserObjectUniqueId];
    const channels: ChannelInterface[] = [];
    const channelsData: any[] = [];
    this.operations().forEach(operation => {
      operation.channels().forEach(channel => {
        const channelData = channel.json();
        // Comparing with the data (JSON) because same channel could exist but it will include the ID based on where it is declared. For example, asyncapi.channels contain ID field.
        if (!channelsData.includes(channelData)) {
          channelsData.push(channelData);
          channels.push(channel);
        }
      });
    });

    Object.entries((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.channels || {}).forEach(([channelId, channelData]) => {
      const channelModel = this.createModel(Channel, channelData as v3.ChannelObject, { id: channelId, pointer: `/channels/${channelId}` });
      if (!channelsData.includes(channelData) && channelModel.messages().some(m => {
        const messageId = (m as any)[xParserObjectUniqueId];
        return messageId === thisMessageId;
      })) {
        channelsData.push(channelData);
        channels.push(channelModel);
      }
    });

    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const thisMessageId = (this._json)[xParserObjectUniqueId];
    const operations: OperationInterface[] = [];
    Object.entries((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.operations || {}).forEach(([operationId, operation]) => {
      const operationModel = this.createModel(Operation, operation as v3.OperationObject, { id: operationId, pointer: `/operations/${operationId}` });
      const operationHasMessage = operationModel.messages().some(m => {
        const messageId = (m as any)[xParserObjectUniqueId];
        return messageId === thisMessageId;
      });
      if (operationHasMessage) {
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
