import { BaseModel } from '../base';
import { Collection } from '../collection';

import { Bindings } from './bindings';
import { Binding } from './binding';
import { extensions } from './mixins';
import { Tags } from './tags';
import { Tag } from './tag';
import { ExternalDocumentations } from './external-documentations';
import { ExternalDocumentation } from './external-documentation';

import { tilde } from '../../utils';

import type { BindingsInterface } from '../bindings';
import type { ComponentsInterface } from '../components';
import type { ExtensionsInterface } from '../extensions';
import type { Constructor } from '../utils';
import type { ServersInterface } from '../servers';
import type { ChannelsInterface } from '../channels';
import type { MessagesInterface } from '../messages';
import type { SchemasInterface } from '../schemas';
import type { ChannelParametersInterface } from '../channel-parameters';
import type { ServerVariablesInterface } from '../server-variables';
import type { OperationTraitsInterface } from '../operation-traits';
import type { SecuritySchemesInterface } from '../security-schemes';
import type { MessageTraitsInterface } from '../message-traits';
import type { OperationsInterface } from '../operations';
import type { TagsInterface } from '../tags';
import type { ExternalDocumentationsInterface } from '../external-documentations';
import type { CorrelationIdsInterface } from '../correlation-ids';

import type { v3 } from '../../spec-types';

export class Components extends BaseModel<v3.ComponentsObject> implements ComponentsInterface {
  servers(): ServersInterface {
    return [] as any;
  }

  channels(): ChannelsInterface {
    return [] as any;
  }

  messages(): MessagesInterface {
    return [] as any;
  }

  schemas(): SchemasInterface {
    return [] as any;
  }

  channelParameters(): ChannelParametersInterface {
    return [] as any;
  }

  serverVariables(): ServerVariablesInterface {
    return [] as any;
  }

  operations(): OperationsInterface {
    return [] as any;
  }

  operationTraits(): OperationTraitsInterface {
    return [] as any;
  }

  messageTraits(): MessageTraitsInterface {
    return [] as any;
  }

  correlationIds(): CorrelationIdsInterface {
    return [] as any;
  }

  securitySchemes(): SecuritySchemesInterface {
    return [] as any;
  }

  tags(): TagsInterface {
    return this.createCollection('tags', Tags, Tag, 'componentId');
  }

  externalDocs(): ExternalDocumentationsInterface {
    return this.createCollection('externalDocs', ExternalDocumentations, ExternalDocumentation, 'componentId');
  }

  serverBindings(): Record<string, BindingsInterface> {
    return this.createBindings('serverBindings');
  }

  channelBindings(): Record<string, BindingsInterface> {
    return this.createBindings('channelBindings');
  }

  operationBindings(): Record<string, BindingsInterface> {
    return this.createBindings('operationBindings');
  }

  messageBindings(): Record<string, BindingsInterface> {
    return this.createBindings('messageBindings');
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }

  isEmpty(): boolean {
    return Object.keys(this._json).length === 0;
  }

  protected createCollection<M extends Collection<any>, T extends BaseModel>(itemsName: keyof v3.ComponentsObject, collectionModel: Constructor<M>, itemModel: Constructor<T>, idKey: string = 'id'): M {
    const collectionItems: T[] = [];
    Object.entries(this._json[itemsName] || {}).forEach(([id, item]) => {
      collectionItems.push(this.createModel(itemModel, item as any, { [idKey]: id, pointer: `/components/${itemsName}/${id}` } as any));
    });
    return new collectionModel(collectionItems);
  }

  protected createBindings(itemsName: 'serverBindings' | 'channelBindings' | 'operationBindings' | 'messageBindings'): Record<string, BindingsInterface> {
    return Object.entries(this._json[itemsName] || {}).reduce((bindings, [name, item]) => {
      const bindingsData = item || {};
      const asyncapi = this.meta('asyncapi');
      const pointer = `components/${itemsName}/${name}`;
      bindings[name] = new Bindings(
        Object.entries(bindingsData).map(([protocol, binding]) => 
          this.createModel(Binding, binding, { protocol, pointer: `${pointer}/${protocol}` })
        ),
        { originalData: bindingsData as any, asyncapi, pointer }
      );
      return bindings;
    }, {} as Record<string, BindingsInterface>);
  }
}
