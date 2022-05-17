import { Channels } from "./channels";
import { Channel } from "./channel";
import { Messages } from "./messages";
import { Message } from "./message";
import { OperationTraits } from "./operation-traits";
import { OperationTrait } from "./operation-trait";
import { Servers } from "./servers";

import { tilde } from "../../utils";

import type { ChannelsInterface } from "../channels";
import type { ChannelInterface } from "../channel";
import type { MessagesInterface } from "../messages";
import type { OperationInterface } from "../operation";
import type { OperationTraitsInterface } from "../operation-traits";
import type { ServersInterface } from "../servers";
import type { ServerInterface } from "../server";

export class Operation extends OperationTrait implements OperationInterface {
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
    Object.entries(this._meta.asyncapi.parsed.channels || {}).forEach(([channelAddress, channel]: [string, any]) => {
      if (channel.subscribe === this._json || channel.publish === this._json) {
        channels.push(
          this.createModel(Channel, channel, { id: channelAddress, pointer: `/channels/${tilde(channelAddress)}` })
        );
      }
    });
    return new Channels(channels);
  }

  messages(): MessagesInterface {
    let isOneOf = false;
    let messages = this._json.message || [];
    if (Array.isArray(messages.oneOf)) {
      messages = messages.oneOf;
      isOneOf = true;
    } else if (!Array.isArray(messages)) {
      messages = [messages];
    }

    return new Messages(
      messages.map((message: any, index: number) => {
        return this.createModel(Message, message, { pointer: `${this._meta.pointer}/message${isOneOf ? `/oneOf/${index}` : ''}` })
      })
    );
  }

  traits(): OperationTraitsInterface {
    return new OperationTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(OperationTrait, trait, { pointer: `${this._meta.pointer}/traits/${index}` })
      })
    );
  }
}
