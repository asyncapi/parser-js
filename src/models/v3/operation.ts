import { Messages } from '../messages';
import { Channels } from '../channels';
import { Channel } from './channel';
import { OperationTraits } from '../operation-traits';
import { OperationTrait } from './operation-trait';
import { Servers } from '../servers';

import type { ChannelsInterface } from '../channels';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { OperationInterface, OperationAction } from '../operation';
import type { OperationTraitsInterface } from '../operation-traits';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';

import type { v3 } from '../../spec-types';

export class Operation extends OperationTrait<v3.OperationObject> implements OperationInterface {
  action(): OperationAction {
    return this._json.action;
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
    if (this._json.channel) {
      return new Channels([
        this.createModel(Channel, this._json.channel as v3.ChannelObject, { id: '', pointer: this.jsonPath('channel') })
      ]);
    }
    return new Channels([]);
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    this.channels().forEach(channel => {
      messages.push(...channel.messages());
    });
    return new Messages(messages);
  }

  traits(): OperationTraitsInterface {
    return new OperationTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(OperationTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}` });
      })
    );
  }
}
