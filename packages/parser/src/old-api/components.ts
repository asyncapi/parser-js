import { SpecificationExtensionsModel, createMapOfType, getMapValue } from './mixins';
import { Channel } from './channel';
import { Message } from './message';
import { Schema } from './schema';
import { SecurityScheme } from './security-scheme';
import { Server } from './server';
import { ChannelParameter } from './channel-parameter';
import { CorrelationId } from './correlation-id';
import { OperationTrait } from './operation-trait';
import { MessageTrait } from './message-trait';
import { ServerVariable } from './server-variable';

import type { v2 } from '../spec-types';

export class Components extends SpecificationExtensionsModel<v2.ComponentsObject> {
  hasChannels() {
    return !!this._json.channels;
  }

  channels() {
    return createMapOfType(this._json.channels as Record<string, v2.ChannelObject>, Channel);
  }
  
  channel(name: string) {
    return getMapValue(this._json.channels as Record<string, v2.ChannelObject>, name, Channel);
  }

  hasMessages() {
    return !!this._json.messages;
  }

  messages() {
    return createMapOfType(this._json.messages as Record<string, v2.MessageObject>, Message);
  }

  message(name: string) {
    return getMapValue(this._json.messages as Record<string, v2.MessageObject>, name, Message);
  }

  hasSchemas() {
    return !!this._json.schemas;
  }

  schemas() {
    return createMapOfType(this._json.schemas as any, Schema);
  }

  schema(name: string) {
    return getMapValue(this._json.schemas as any, name, Schema);
  }

  hasSecuritySchemes() {
    return !!this._json.securitySchemes;
  }

  securitySchemes() {
    return createMapOfType(this._json.securitySchemes as Record<string, v2.SecuritySchemeObject>, SecurityScheme);
  }

  securityScheme(name: string) {
    return getMapValue(this._json.securitySchemes as Record<string, v2.SecuritySchemeObject>, name, SecurityScheme);
  }

  hasServers() {
    return !!this._json.servers;
  }

  servers() {
    return createMapOfType(this._json.servers as Record<string, v2.ServerObject>, Server);
  }

  server(name: string) {
    return getMapValue(this._json.servers as Record<string, v2.ServerObject>, name, Server);
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

  hasCorrelationIds() {
    return !!this._json.correlationIds;
  }

  correlationIds() {
    return createMapOfType(this._json.correlationIds as Record<string, v2.CorrelationIDObject>, CorrelationId);
  }

  correlationId(name: string) {
    return getMapValue(this._json.correlationIds as Record<string, v2.CorrelationIDObject>, name, CorrelationId);
  }

  hasOperationTraits() {
    return !!this._json.operationTraits;
  }

  operationTraits() {
    return createMapOfType(this._json.operationTraits as Record<string, v2.OperationTraitObject>, OperationTrait);
  }

  operationTrait(name: string) {
    return getMapValue(this._json.operationTraits as Record<string, v2.OperationTraitObject>, name, OperationTrait);
  }

  hasMessageTraits() {
    return !!this._json.messageTraits;
  }

  messageTraits(): Record<string, MessageTrait<v2.MessageTraitObject>> {
    return createMapOfType(this._json.messageTraits as Record<string, v2.MessageTraitObject>, MessageTrait) as Record<string, MessageTrait<v2.MessageTraitObject>>;
  }

  messageTrait(name: string): MessageTrait<v2.MessageTraitObject> {
    return getMapValue(this._json.messageTraits as Record<string, v2.MessageTraitObject>, name, MessageTrait) as MessageTrait<v2.MessageTraitObject>;
  }

  hasServerVariables() {
    return !!this._json.serverVariables;
  }

  serverVariables() {
    return createMapOfType(this._json.serverVariables as Record<string, v2.ServerVariableObject>, ServerVariable);
  }

  serverVariable(name: string) {
    return getMapValue(this._json.serverVariables as Record<string, v2.ServerVariableObject>, name, ServerVariable);
  }
}