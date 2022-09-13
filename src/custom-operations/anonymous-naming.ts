import { xParserMessageName, xParserSchemaId } from '../constants';
import { traverseAsyncApiDocument } from '../iterator';
import { setExtension } from '../utils';

import type { 
  AsyncAPIDocumentInterface,
  SchemaInterface
} from '../models';

export function anonymousNaming(document: AsyncAPIDocumentInterface) {
  assignNameToComponentMessages(document);
  assignNameToAnonymousMessages(document);

  assignUidToComponentSchemas(document);
  assignUidToComponentParameterSchemas(document);
  assignUidToChannelParameterSchemas(document);
  assignUidToAnonymousSchemas(document);
}

function assignNameToComponentMessages(document: AsyncAPIDocumentInterface) {
  document.components().messages().forEach(message => {
    if (message.name() === undefined) {
      setExtension(xParserMessageName, message.id(), message);
    }
  });
}

function assignNameToAnonymousMessages(document: AsyncAPIDocumentInterface) {
  let anonymousMessageCounter = 0;
  document.messages().forEach(message => {
    if (message.name() === undefined && message.extensions().get(xParserMessageName) === undefined) {
      setExtension(xParserMessageName, `<anonymous-message-${++anonymousMessageCounter}>`, message);
    }
  });
}

function assignUidToComponentParameterSchemas(document: AsyncAPIDocumentInterface) {
  document.components().channelParameters().forEach(parameter => {
    const schema = parameter.schema();
    if (schema && !schema.uid()) {
      setExtension(xParserSchemaId, parameter.id(), schema);
    }
  });
}

function assignUidToChannelParameterSchemas(document: AsyncAPIDocumentInterface) {
  document.channels().forEach(channel => {
    channel.parameters().forEach(parameter => {
      const schema = parameter.schema();
      if (schema) {
        setExtension(xParserSchemaId, parameter.id(), schema);
      }
    });
  });
}

function assignUidToComponentSchemas(document: AsyncAPIDocumentInterface) {
  document.components().schemas().forEach(schema => {
    setExtension(xParserSchemaId, schema.uid(), schema);
  });
}
  
function assignUidToAnonymousSchemas(doc: AsyncAPIDocumentInterface) {
  let anonymousSchemaCounter = 0;
  function callback(schema: SchemaInterface) {
    if (!schema.uid()) {
      setExtension(xParserSchemaId, `<anonymous-schema-${++anonymousSchemaCounter}>`, schema);
    }
  };
  traverseAsyncApiDocument(doc, callback);
}
