import { BaseModel } from '../base';
import { Channels } from './channels';
import { Channel } from './channel';
import { Messages } from './messages';
import { Operations } from './operations';
import { SecurityScheme } from './security-scheme';
import { ServerVariables } from './server-variables';
import { ServerVariable } from './server-variable';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import { tilde } from "../../utils";

import type { ModelMetadata } from "../base";
import type { ChannelsInterface } from '../channels';
import type { ChannelInterface } from '../channel';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { MessagesInterface } from '../messages';
import type { MessageInterface } from '../message';
import type { ServerInterface } from '../server';
import type { ServerVariablesInterface } from '../server-variables';
import type { SecuritySchemeInterface } from '../security-scheme';

export class Server extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin) implements ServerInterface {
  constructor(
    _json: Record<string, any>,
    protected readonly _meta: ModelMetadata & { id: string } = {} as any,
  ) {
    super(_json, _meta);
  }

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

  protocolVersion(): string {
    return this._json.protocolVersion;
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
      operations.push(...channel.operations().all())
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
        })
      })
    );
  }

  security(): Array<Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }>> {
    const securitySchemes = this._meta?.asyncapi?.parsed.components.securitySchemes || {};
    return (this._json.security || []).map((requirement: any) => {
      const requirements: Record<string, { schema: SecuritySchemeInterface; scopes: string[]; }> = {};
      Object.entries(requirement).forEach(([security, scopes]) => {
        requirements[security] = {
          schema: this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` }),
          scopes: scopes as Array<string>,
        }
      });
      return requirements;
    })
  }
}
