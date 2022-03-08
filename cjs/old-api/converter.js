"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToOldAPI = void 0;
const asyncapi_1 = require("./asyncapi");
const constants_1 = require("../constants");
const stringify_1 = require("../stringify");
const schema_parser_1 = require("../schema-parser");
function convertToOldAPI(newDocument) {
    const data = (0, stringify_1.copy)(newDocument.json());
    const document = new asyncapi_1.AsyncAPIDocument(data);
    handleMessages(document);
    handleOperations(document);
    return document;
}
exports.convertToOldAPI = convertToOldAPI;
function handleMessages(document) {
    const defaultSchemaFormat = (0, schema_parser_1.getDefaultSchemaFormat)(document.version());
    for (const message of document.allMessages().values()) {
        const json = message.json();
        if (json.traits) {
            json[constants_1.xParserOriginalTraits] = json.traits;
            delete json.traits;
        }
        json[constants_1.xParserOriginalSchemaFormat] = json.schemaFormat || defaultSchemaFormat;
        json.schemaFormat = defaultSchemaFormat;
        json[constants_1.xParserOriginalPayload] = json[constants_1.xParserOriginalPayload] || json.payload;
        json[constants_1.xParserMessageParsed] = true;
    }
}
function handleOperations(document) {
    Object.values(document.channels()).forEach(channel => {
        const publish = channel.publish();
        const subscribe = channel.subscribe();
        if (publish) {
            const json = publish.json();
            if (json.traits) {
                json[constants_1.xParserOriginalTraits] = json.traits;
                delete json.traits;
            }
        }
        if (subscribe) {
            const json = subscribe.json();
            if (json.traits) {
                json[constants_1.xParserOriginalTraits] = json.traits;
                delete json.traits;
            }
        }
    });
}
