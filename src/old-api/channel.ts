import { SpecificationExtensionsModel, hasDescription, description, createMapOfType, bindingsMixins, getMapValue } from './mixins';
import { ChannelParameter } from './channel-parameter';
import { Operation } from './operation';

import type { v2 } from '../spec-types';

export class Channel extends SpecificationExtensionsModel<v2.ChannelObject> {
  description() {
    return description(this);
  }

  hasDescription() {
    return hasDescription(this);
  }

  hasParameters() {
    return !!this._json.parameters;
  }

  parameters() {
    return createMapOfType(this._json.parameters as Record<string, v2.ParameterObject>, ChannelParameter);
  }
  
  parameter(name: string) {
    return getMapValue(this._json.parameters as Record<string, v2.ParameterObject>, name, ChannelParameter);
  }

  hasServers() {
    return !!this._json.servers;
  }

  servers() {
    if (!this._json.servers) return [];
    return this._json.servers;
  }

  server(index: number | string) {
    if (!this._json.servers) return null;
    if (typeof index !== 'number') return null;
    if (index > this._json.servers.length - 1) return null;
    return this._json.servers[+index];
  }

  publish() {
    if (!this._json.publish) return null;
    return new Operation(this._json.publish);
  }

  subscribe() {
    if (!this._json.subscribe) return null;
    return new Operation(this._json.subscribe);
  }

  hasPublish() {
    return !!this._json.publish;
  }

  hasSubscribe() {
    return !!this._json.subscribe;
  }

  hasBindings() {
    return bindingsMixins.hasBindings(this as any);
  }

  bindings() {
    return bindingsMixins.bindings(this as any);
  }

  bindingProtocols() {
    return bindingsMixins.bindingProtocols(this as any);
  }

  hasBinding(name: string): boolean {
    return bindingsMixins.hasBinding(this as any, name);
  }

  binding(name: string) {
    return bindingsMixins.binding(this as any, name);
  }
}