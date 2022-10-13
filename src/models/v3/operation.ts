import type { v3 } from '../../spec-types';
import { tilde } from '../../utils';
import { BaseModel } from '../base';
import { OperationAction, OperationInterface } from '../operation';
import { ChannelInterface } from '../channel';
import { Channels, ChannelsInterface } from '../channels';
import { Channel } from './channel';
import { SecurityRequirements } from '../security-requirements';
import { SecurityRequirement } from './security-requirement';
import { SecurityScheme } from './security-scheme';
import { TagsInterface } from '../tags';
import { bindings, extensions, tags } from './mixins';
import { BindingsInterface } from '../bindings';
import { ExtensionsInterface } from '../extensions';
import { ServersInterface, Servers } from '../servers';
import { ServerInterface } from '../server';
import { MessagesInterface, Messages } from '../messages';
import { MessageInterface } from '../message';
import { ExternalDocumentationInterface } from '../external-docs';
import { ExternalDocumentation } from './external-docs';
import { OperationTraits, OperationTraitsInterface } from '../operation-traits';
import { OperationTrait } from './operation-trait';

export class Operation extends BaseModel<v3.OperationObject> implements OperationInterface {
  id(): string {
    return this._json['x-parser-id'];
  }

  hasId(): boolean {
    return true;
  }

  action(): OperationAction {
    return this._json.action;
  }

  isSend(): boolean {
    return this._json.action === 'send';
  }

  isReceive(): boolean {
    return this._json.action === 'receive';
  }

  servers(): ServersInterface {
    const servers: ServerInterface[] = [];
    const serversData: v3.ServerObject[] = [];
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
  
  messages(): MessagesInterface {
    const messages: MessageInterface[] = [];
    this.channels().forEach(channel => {
      channel.messages().forEach(message => {
        messages.push(message);
      });
    });
    return new Messages(messages);
  }

  channels(): ChannelsInterface {
    const channels: ChannelInterface[] = [];
    const pointer = this._json.channel.address ? tilde(`/channels/${this._json.channel.address}`) : undefined;
    channels.push(
      this.createModel(Channel, this._json.channel, { id: this._json.channel['x-parser-id'], address: this._json.channel.address, pointer })
    );
    return new Channels(channels);
  }

  summary(): string | undefined {
    return this._json.summary;
  }

  hasSummary(): boolean {
    return this._json.summary !== undefined;
  }

  description(): string | undefined {
    return this._json.description;
  }

  hasDescription(): boolean {
    return this._json.description !== undefined;
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

  tags(): TagsInterface {
    return tags(this);
  }

  bindings(): BindingsInterface {
    return bindings(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    if (!this.hasExternalDocs()) return;
    return new ExternalDocumentation(this._json.externalDocs as v3.ExternalDocumentationObject);
  }

  hasExternalDocs(): boolean {
    return this._json.externalDocs === undefined;
  }

  traits(): OperationTraitsInterface {
    return new OperationTraits(
      (this._json.traits || []).map((trait: v3.OperationTraitObject, index: number) => {
        return this.createModel(OperationTrait, trait, { id: '', pointer: `${this._meta.pointer}/traits/${index}`, action: trait.action as OperationAction });
      })
    );
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}
