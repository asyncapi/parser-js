import { Messages } from '../messages';
import { Message } from './message';
import { Channels } from '../channels';
import { Channel } from './channel';
import { OperationTraits } from '../operation-traits';
import { OperationTrait } from './operation-trait';
import { OperationReply } from './operation-reply';
import { Servers } from '../servers';

import type { ChannelsInterface } from '../channels';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { OperationInterface, OperationAction } from '../operation';
import type { OperationReplyInterface } from 'models/operation-reply';
import type { OperationTraitsInterface } from '../operation-traits';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';

import type { v3 } from '../../spec-types';

export class Operation extends OperationTrait<v3.OperationObject> implements OperationInterface {
  action(): OperationAction {
    return this._json.action;
  }

  isSend(): boolean {
    return this.action() === 'send';
  }

  isReceive(): boolean {
    return this.action() === 'receive';
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
    if (this._json.channel) {
      for (const [channelName, channel] of Object.entries(this._meta.asyncapi?.parsed.channels || {})) {
        if (channel === this._json.channel) {
          return new Channels([
            this.createModel(Channel, this._json.channel as v3.ChannelObject, { id: channelName, pointer: `/channels/${channelName}` })
          ]);
        }
      }
    }
    return new Channels([]);
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    if (Array.isArray(this._json.messages)) {
      this._json.messages.forEach((message, index) => {
        messages.push(
          this.createModel(Message, message as v3.MessageObject, { id: '', pointer: this.jsonPath(`messages/${index}`) })
        );
      });
      return new Messages(messages);
    }

    this.channels().forEach(channel => {
      messages.push(...channel.messages());
    });
    return new Messages(messages);
  }

  reply(): OperationReplyInterface | undefined {
    if (this._json.reply) {
      return this.createModel(OperationReply, this._json.reply as v3.OperationReplyObject, { pointer: this.jsonPath('reply') });
    }
  }

  traits(): OperationTraitsInterface {
    return new OperationTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(OperationTrait, trait, { id: '', pointer: this.jsonPath(`traits/${index}`) });
      })
    );
  }
}
