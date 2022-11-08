import { BaseModel } from '../base';
import { ChannelParameters } from '../channel-parameters';
import { ChannelParameter } from './channel-parameter';
import { Messages } from '../messages';
import { Message } from './message';
import { Operations } from '../operations';
import { Operation } from './operation';
import { Servers } from '../servers';
import { Server } from './server';

import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';

import type { BindingsInterface } from '../bindings';
import type { ChannelInterface } from '../channel';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-documentation';
import type { MessagesInterface } from '../messages';
import type { OperationsInterface } from '../operations';
import type { OperationInterface } from '../operation';
import type { ServersInterface } from '../servers';
import type { ServerInterface } from '../server';
import type { TagsInterface } from '../tags';

import type { v3 } from '../../spec-types';

export class Channel extends BaseModel<v3.ChannelObject, { id: string }> implements ChannelInterface {
  id(): string {
    return this._meta.id;
  }

  address(): string | null | undefined {
    return this._json.address;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const allowedServers = this._json.servers || [];
    Object.entries(this._meta.asyncapi?.parsed?.servers || {}).forEach(([serverName, server]) => {
      if (allowedServers.length === 0) {
        servers.push(this.createModel(Server, server, { id: serverName, pointer: `/servers/${serverName}` }));
      } else {
        const index = allowedServers.indexOf(server);
        if (index !== -1) {
          servers.push(this.createModel(Server, server, { id: serverName, pointer: this.jsonPath(`servers/${index}`) }));
        }
      }
    });
    return new Servers(servers);
  }

  operations(): OperationsInterface {
    const operations: OperationInterface[] = [];
    Object.entries(((this._meta.asyncapi?.parsed as v3.AsyncAPIObject)?.operations || {})).forEach(([operationId, operation]) => {
      if (operation.channel === this._json) {
        operations.push(
          this.createModel(Operation, operation, { id: operationId, pointer: `/operations/${operationId}` }),
        );
      }
    });
    return new Operations(operations);
  }

  messages(): MessagesInterface {
    return new Messages(
      Object.entries(this._json.messages || {}).map(([messageName, message]) => {
        return this.createModel(Message, message, { id: messageName, pointer: this.jsonPath(`messages/${messageName}`) });
      })
    );
  }

  parameters(): ChannelParametersInterface {
    return new ChannelParameters(
      Object.entries(this._json.parameters || {}).map(([channelParameterName, channelParameter]) => {
        return this.createModel(ChannelParameter, channelParameter as v3.ParameterObject, {
          id: channelParameterName,
          pointer: `${this._meta.pointer}/parameters/${channelParameterName}`
        });
      })
    );
  }

  tags(): TagsInterface {
    return tags(this);
  }

  bindings(): BindingsInterface {
    return bindings(this); 
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
