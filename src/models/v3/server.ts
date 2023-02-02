import { Channels } from '../channels';
import { Channel } from './channel';
import { Messages } from '../messages';
import { Operations } from '../operations';
import { SecurityScheme } from './security-scheme';
import { ServerVariables } from '../server-variables';
import { ServerVariable } from './server-variable';
import { SecurityRequirements } from '../security-requirements';
import { SecurityRequirement } from './security-requirement';

import { CoreModel } from './mixins';
import { tilde } from '../../utils';

import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';

import type { v3 } from '../../spec-types';

export class Server extends CoreModel<v3.ServerObject, { id: string }> implements ServerInterface {
  id(): string {
    return this._meta.id;
  }

  url(): string {
    return `${this._json.host}${this._json.pathname}`;
  }

  host(): string {
    return this._json.host;
  }

  protocol(): string {
    return this._json.protocol;
  }

  pathname(): string | undefined {
    return this._json.pathname;
  }

  hasProtocolVersion(): boolean {
    return !!this._json.protocolVersion;
  }

  protocolVersion(): string | undefined {
    return this._json.protocolVersion;
  }

  channels(): ChannelsInterface {
    const channels: ChannelInterface[] = [];
    Object.entries((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.channels || {}).forEach(([channelName, channel]) => {
      const allowedServers = (channel as v3.ChannelObject).servers || [];
      if (allowedServers.length === 0 || allowedServers.includes(this._json)) {
        channels.push(this.createModel(Channel, channel as v3.ChannelObject, { id: channelName, pointer: `/channels/${tilde(channelName)}` }));
      }
    });
    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    const operationsData: v3.OperationObject[] = [];
    this.channels().forEach(channel => {
      channel.operations().forEach(operation => {
        const operationData = operation.json();
        if (!operationsData.includes(operationData)) {
          operations.push(operation);
          operationsData.push(operationData);
        }
      });
    });
    return new Operations(operations);
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    const messagedData: v3.MessageObject[] = [];
    this.channels().forEach(channel => {
      channel.messages().forEach(message => {
        const messageData = message.json();
        if (!messagedData.includes(messageData)) {
          messages.push(message);
          messagedData.push(messageData);
        }
      });
    });
    return new Messages(messages);
  }

  variables(): ServerVariablesInterface {
    return new ServerVariables(
      Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
        return this.createModel(ServerVariable, serverVariable as v3.ServerVariableObject, {
          id: serverVariableName,
          pointer: this.jsonPath(`variables/${serverVariableName}`),
        });
      })
    );
  }

  security(): SecurityRequirements[] {
    return (this._json.security || []).map((security, index) => {
      const scheme = this.createModel(SecurityScheme, security as v3.SecuritySchemeObject, { id: '', pointer: this.jsonPath(`security/${index}`) });
      const requirement = this.createModel(SecurityRequirement, { scheme, scopes: (security as v3.SecuritySchemeObject).scopes }, { id: '', pointer: this.jsonPath(`security/${index}`) });
      return new SecurityRequirements([requirement]);
    });
  }
}
