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
    return this._json.url;
  }

  protocol(): string {
    return this._json.protocol;
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
      const allowedServers: v3.ServerObject[] = channel.servers || [];
      if (allowedServers.length === 0 || allowedServers.includes(this._json)) {
        channels.push(this.createModel(Channel, channel, { id: channelName, pointer: `/channels/${tilde(channelName)}` }));
      }
    });
    Object.entries((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.operations || {}).forEach(([operationId, operation]) => {
      const operationChannel = operation.channel as v3.ChannelObject | undefined;
      if (!channels.some(channel => channel.json() === operationChannel)) {
        const allowedServers: v3.ServerObject[] = (operationChannel as v3.ChannelObject).servers || [];
        if (allowedServers.length === 0 || allowedServers.includes(this._json)) {
          channels.push(this.createModel(Channel, operationChannel as v3.ChannelObject, { id: '', pointer: `/operations/${tilde(operationId)}/channel` }));
        }
      }
    });
    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    const operationsData: v3.OperationObject[] = [];
    this.channels().forEach(channel => {
      channel.operations().forEach(operation => {
        if (!operationsData.includes(operation.json())) {
          operations.push(operation);
          operationsData.push(operation.json());
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
        if (!messagedData.includes(message.json())) {
          messages.push(message);
          messagedData.push(message.json());
        }
      });
    });
    return new Messages(messages);
  }

  variables(): ServerVariablesInterface {
    return new ServerVariables(
      Object.entries(this._json.variables || {}).map(([serverVariableName, serverVariable]) => {
        return this.createModel(ServerVariable, serverVariable, {
          id: serverVariableName,
          pointer: `${this._meta.pointer}/variables/${serverVariableName}`
        });
      })
    );
  }

  security(): SecurityRequirements[] {
    const securitySchemes = (this._meta?.asyncapi?.parsed?.components?.securitySchemes || {}) as Record<string, v3.SecuritySchemeObject>;
    return (this._json.security || []).map((requirement, index) => {
      const requirements: SecurityRequirement[] = [];
      Object.entries(requirement).forEach(([security, scopes]) => {
        const scheme = this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
        requirements.push(
          this.createModel(SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` })
        );
      });
      return new SecurityRequirements(requirements);
    });
  }
}
