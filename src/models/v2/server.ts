import { BaseModel } from '../base';
import { Channels } from './channels';
import { Channel } from './channel';
import { Messages } from './messages';
import { Operations } from './operations';
import { SecurityScheme } from './security-scheme';
import { ServerVariables } from './server-variables';
import { ServerVariable } from './server-variable';
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';

import { bindings, hasDescription, description, extensions } from './mixins';
import { tilde } from '../../utils';

import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';
import type { ExtensionsInterface } from '../extensions';
import type { BindingsInterface } from '../bindings';

import type { v2 } from '../../spec-types';

export class Server extends BaseModel<v2.ServerObject, { id: string }> implements ServerInterface {
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

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  channels(): ChannelsInterface {
    const channels: ChannelInterface[] = [];
    Object.entries(this._meta.asyncapi?.parsed.channels || {}).map(([channelAddress, channel]: [string, any]) => {
      const allowedServers: string[] = channel.servers || [];
      if (allowedServers.length === 0 || allowedServers.includes(this._meta.id)) {
        channels.push(this.createModel(Channel, channel, { id: channelAddress, address: channelAddress, pointer: `/channels/${tilde(channelAddress)}` }));
      }
    });
    return new Channels(channels);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    this.channels().forEach(channel => {
      operations.push(...channel.operations().all());
    });
    return new Operations(operations);
  }

  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    this.operations().forEach(operation => messages.push(...operation.messages().all()));
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
    const securitySchemes = (this._meta?.asyncapi?.parsed?.components?.securitySchemes || {}) as Record<string, v2.SecuritySchemeObject>;
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

  bindings(): BindingsInterface {
    return bindings(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
