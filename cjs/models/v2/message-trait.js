"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTrait = void 0;
const base_1 = require("../base");
const correlation_id_1 = require("./correlation-id");
const message_examples_1 = require("./message-examples");
const message_example_1 = require("./message-example");
const schema_1 = require("./schema");
const constants_1 = require("../../constants");
const schema_parser_1 = require("../../schema-parser");
const mixins_1 = require("./mixins");
class MessageTrait extends base_1.BaseModel {
    id() {
        var _a;
        return this.messageId() || this._meta.id || ((_a = this.extensions().get(constants_1.xParserMessageName)) === null || _a === void 0 ? void 0 : _a.value());
    }
    schemaFormat() {
        return this._json.schemaFormat || (0, schema_parser_1.getDefaultSchemaFormat)(this._meta.asyncapi.semver.version);
    }
    hasMessageId() {
        return !!this._json.messageId;
    }
    messageId() {
        return this._json.messageId;
    }
    hasCorrelationId() {
        return !!this._json.correlationId;
    }
    correlationId() {
        if (!this._json.correlationId)
            return undefined;
        return this.createModel(correlation_id_1.CorrelationId, this._json.correlationId, { pointer: `${this._meta.pointer}/correlationId` });
    }
    hasContentType() {
        return !!this._json.contentType;
    }
    contentType() {
        var _a;
        return this._json.contentType || ((_a = this._meta.asyncapi) === null || _a === void 0 ? void 0 : _a.parsed.defaultContentType);
    }
    hasHeaders() {
        return !!this._json.headers;
    }
    headers() {
        if (!this._json.headers)
            return undefined;
        return this.createModel(schema_1.Schema, this._json.headers, { pointer: `${this._meta.pointer}/headers` });
    }
    hasName() {
        return !!this._json.name;
    }
    name() {
        return this._json.name;
    }
    hasTitle() {
        return !!this._json.title;
    }
    title() {
        return this._json.title;
    }
    hasSummary() {
        return !!this._json.summary;
    }
    summary() {
        return this._json.summary;
    }
    hasDescription() {
        return (0, mixins_1.hasDescription)(this);
    }
    description() {
        return (0, mixins_1.description)(this);
    }
    hasExternalDocs() {
        return (0, mixins_1.hasExternalDocs)(this);
    }
    externalDocs() {
        return (0, mixins_1.externalDocs)(this);
    }
    examples() {
        return new message_examples_1.MessageExamples((this._json.examples || []).map((example, index) => {
            return this.createModel(message_example_1.MessageExample, example, { pointer: `${this._meta.pointer}/examples/${index}` });
        }));
    }
    tags() {
        return (0, mixins_1.tags)(this);
    }
    bindings() {
        return (0, mixins_1.bindings)(this);
    }
    extensions() {
        return (0, mixins_1.extensions)(this);
    }
}
exports.MessageTrait = MessageTrait;
