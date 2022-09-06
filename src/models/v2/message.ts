import { Channels } from './channels';
import { Operations } from './operations';
import { Operation } from './operation';
import { MessageTraits } from "./message-traits";
import { MessageTrait } from "./message-trait";
import { Servers } from './servers';
import { Schema } from './schema';

import { tilde } from '../../utils';

import type { ChannelsInterface } from "../channels";
import type { ChannelInterface } from "../channel";
import type { MessageInterface } from "../message";
import type { MessageTraitsInterface } from "../message-traits";
import type { OperationsInterface } from "../operations";
import type { OperationAction, OperationInterface } from "../operation";
import type { ServersInterface } from "../servers";
import type { ServerInterface } from "../server";
import type { SchemaInterface } from "../schema";

import type { v2 } from "../../spec-types";

export class Message extends MessageTrait<v2.MessageObject> implements MessageInterface {
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
      })
    });
    return new Servers(servers);
  }

  channels(): ChannelsInterface {
    const channels: ChannelInterface[] = [];
    const channelsData: any[] = [];
    this.operations().all().forEach(operation => {
      operation.channels().forEach(channel => {
        if (!channelsData.includes(channel.json())) {
          channelsData.push(channel.json());
          channels.push(channel);
        }
      })
    });
    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    Object.entries(this._meta.asyncapi?.parsed.channels || {}).forEach(([channelAddress, channel]: [string, any]) => {
      ['subscribe', 'publish'].forEach(operationAction => {
        const operation = channel[operationAction];
        if (operation && (
          operation.message === this._json ||
          (operation.message.oneOf || []).includes(this._json)
        )) {
          operations.push(
            this.createModel(Operation, operation, { id: '', pointer: `/channels/${tilde(channelAddress)}/${operationAction}`, action: operationAction as OperationAction })
          );
        }
      });
    });
    return new Operations(operations);
  }

  traits(): MessageTraitsInterface {
    return new MessageTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(MessageTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}` })
      })
    );
  }
}
