import { SpecificationExtensionsModel, hasExternalDocs, externalDocs, tagsMixins, createMapOfType, getMapValue } from './mixins';
import { Info } from './info';
import { Server } from './server';
import { Channel } from './channel';
import { Components } from './components';
import { Message } from './message';
import { Schema } from './schema';

import { xParserCircular } from '../constants';
import { stringify, unstringify } from '../stringify';

import type { v2 } from '../spec-types';
import type { Operation } from './operation';

export class AsyncAPIDocument extends SpecificationExtensionsModel<v2.AsyncAPIObject> {
  version() {
    return this._json.asyncapi;
  }

  info() {
    return new Info(this._json.info);
  }

  id() {
    return this._json.id;
  }

  externalDocs() {
    return externalDocs(this);
  }

  hasExternalDocs() {
    return hasExternalDocs(this);
  }

  hasTags() {
    return tagsMixins.hasTags(this);
  }

  tags() {
    return tagsMixins.tags(this);
  }

  tagNames() {
    return tagsMixins.tagNames(this);
  }

  hasTag(name: string) {
    return tagsMixins.hasTag(this, name);
  }

  tag(name: string) {
    return tagsMixins.tag(this, name);
  }

  hasServers() {
    return !!this._json.servers;
  }

  servers() {
    return createMapOfType(this._json.servers, Server);
  }

  serverNames() {
    if (!this._json.servers) return [];
    return Object.keys(this._json.servers);
  }

  server(name: string) {
    return getMapValue(this._json.servers, name, Server);
  }

  hasDefaultContentType() {
    return !!this._json.defaultContentType;
  }

  defaultContentType() {
    return this._json.defaultContentType || null;
  }

  hasChannels() {
    return !!this._json.channels;
  }

  channels() {
    return createMapOfType(this._json.channels, Channel);
  }

  channelNames() {
    if (!this._json.channels) return [];
    return Object.keys(this._json.channels);
  }

  channel(name: string) {
    return getMapValue(this._json.channels, name, Channel);
  }

  hasComponents() {
    return !!this._json.components;
  }

  components() {
    if (!this._json.components) return null;
    return new Components(this._json.components);
  }

  hasMessages() {
    return !!this.allMessages().size;
  }

  allMessages(): Map<string, Message> {
    const messages = new Map<string, Message>();

    if (this.hasChannels()) {
      this.channelNames().forEach(channelName => {
        const channel = this.channel(channelName);
        if (channel) {
          if (channel.hasPublish()) {
            (channel.publish() as Operation).messages().forEach(m => {
              messages.set(m.uid(), m);
            });
          }
          if (channel.hasSubscribe()) {
            (channel.subscribe() as Operation).messages().forEach(m => {
              messages.set(m.uid(), m);
            });
          }
        }
      });
    }
    if (this.hasComponents()) {
      Object.values((this.components() as Components).messages()).forEach(m => {
        messages.set(m.uid(), m);
      });
    }

    return messages;
  }

  // TODO: Retrieve all schemas
  allSchemas(): Map<string, Schema> {
    const schemas = new Map<string, Schema>();

    return schemas;
  }

  hasCircular() {
    return !!this._json[xParserCircular];
  }

  // TODO: Make traversing for old API and enable that function
  // traverseSchemas(callback, schemaTypesToIterate) {
  //   traverseAsyncApiDocument(this, callback, schemaTypesToIterate);
  // }

  static stringify(doc: AsyncAPIDocument, space: number): string | undefined {
    return stringify(doc, { space });
  }

  static parse(doc: string): AsyncAPIDocument | undefined {
    const possibleDocument = unstringify(doc);
    if (!possibleDocument) return;
    return new AsyncAPIDocument(possibleDocument.json());
  }
}