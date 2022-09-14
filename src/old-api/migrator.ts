import { AsyncAPIDocument } from './asyncapi';
import { xParserOriginalPayload, xParserOriginalSchemaFormat, xParserOriginalTraits, xParserMessageParsed } from '../constants';
import { copy } from '../stringify';
import { getDefaultSchemaFormat } from '../schema-parser';

import type { AsyncAPIDocumentInterface } from '../models/asyncapi';

export function migrateToOldAPI(newDocument: AsyncAPIDocumentInterface): AsyncAPIDocument {
  const data = copy(newDocument.json());
  const document = new AsyncAPIDocument(data);

  handleMessages(document);
  handleOperations(document);

  return document;
}

function handleMessages(document: AsyncAPIDocument) {
  const defaultSchemaFormat = getDefaultSchemaFormat(document.version());
  for (const message of document.allMessages().values()) {
    const json = message.json();
    if (json.traits) {
      json[xParserOriginalTraits] = json.traits;
      delete json.traits;
    }
    json[xParserOriginalSchemaFormat] = json.schemaFormat || defaultSchemaFormat;
    json.schemaFormat = defaultSchemaFormat;
    json[xParserOriginalPayload] = json[xParserOriginalPayload] || json.payload;
    json[xParserMessageParsed] = true;
  }
}

function handleOperations(document: AsyncAPIDocument) {
  Object.values(document.channels()).forEach(channel => {
    const publish = channel.publish();
    const subscribe = channel.subscribe();
    if (publish) {
      const json = publish.json();
      if (json.traits) {
        json[xParserOriginalTraits] = json.traits;
        delete json.traits;
      }
    }
    if (subscribe) {
      const json = subscribe.json();
      if (json.traits) {
        json[xParserOriginalTraits] = json.traits;
        delete json.traits;
      }
    }
  });
}
