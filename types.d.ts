declare module "@asyncapi/parser" {
    /**
     * Instantiates an error
     * @param definition.type - The type of the error.
     * @param definition.title - The message of the error.
     * @param [definition.detail] - A string containing more detailed information about the error.
     * @param [definition.parsedJSON] - The resulting JSON after YAML transformation. Or the JSON object if the this was the initial format.
     * @param [definition.validationErrors] - The errors resulting from the validation. For more information, see https://www.npmjs.com/package/better-ajv-errors.
     * @param definition.validationErrors.title - A validation error message.
     * @param definition.validationErrors.jsonPointer - The path to the field that contains the error. Uses JSON Pointer format.
     * @param definition.validationErrors.startLine - The line where the error starts in the AsyncAPI document.
     * @param definition.validationErrors.startColumn - The column where the error starts in the AsyncAPI document.
     * @param definition.validationErrors.startOffset - The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document.
     * @param definition.validationErrors.endLine - The line where the error ends in the AsyncAPI document.
     * @param definition.validationErrors.endColumn - The column where the error ends in the AsyncAPI document.
     * @param definition.validationErrors.endOffset - The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document.
     * @param [definition.location] - Error location details after trying to parse an invalid JSON or YAML document.
     * @param definition.location.startLine - The line of the YAML/JSON document where the error starts.
     * @param definition.location.startColumn - The column of the YAML/JSON document where the error starts.
     * @param definition.location.startOffset - The offset (starting from the beginning of the document) where the error starts in the YAML/JSON AsyncAPI document.
     * @param [definition.refs] - Error details after trying to resolve $ref's.
     * @param definition.refs.title - A validation error message.
     * @param definition.refs.jsonPointer - The path to the field that contains the error. Uses JSON Pointer format.
     * @param definition.refs.startLine - The line where the error starts in the AsyncAPI document.
     * @param definition.refs.startColumn - The column where the error starts in the AsyncAPI document.
     * @param definition.refs.startOffset - The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document.
     * @param definition.refs.endLine - The line where the error ends in the AsyncAPI document.
     * @param definition.refs.endColumn - The column where the error ends in the AsyncAPI document.
     * @param definition.refs.endOffset - The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document.
     */
    class ParserError extends Error {
        constructor(definition: {
            type: string;
            title: string;
            detail?: string;
            parsedJSON?: any;
            validationErrors?: {
                title: string;
                jsonPointer: string;
                startLine: number;
                startColumn: number;
                startOffset: number;
                endLine: number;
                endColumn: number;
                endOffset: number;
            }[];
            location?: {
                startLine: number;
                startColumn: number;
                startOffset: number;
            };
            refs?: {
                title: string;
                jsonPointer: string;
                startLine: number;
                startColumn: number;
                startOffset: number;
                endLine: number;
                endColumn: number;
                endOffset: number;
            }[];
        });
        /**
         * Returns a JS object representation of the error.
         */
        toJS(): void;
    }
    class AsyncAPIDocument extends Base {
        version(): string;
        info(): Info;
        id(): string;
        hasServers(): boolean;
        servers(): {
            [key: string]: Server;
        };
        /**
         * @param name - Name of the server.
         */
        server(name: string): Server;
        hasChannels(): boolean;
        channels(): {
            [key: string]: Channel;
        };
        channelNames(): string[];
        /**
         * @param name - Name of the channel.
         */
        channel(name: string): Channel;
        defaultContentType(): string;
        hasComponents(): boolean;
        components(): Components;
        hasTags(): boolean;
        tags(): Tag[];
        hasMessages(): boolean;
        allMessages(): Map<string, Message>;
        allSchemas(): Map<string, Schema>;
        hasCircular(): boolean;
    }
    class Base {
        json(): any;
    }
    /**
     * Implements functions to deal with a ChannelParameter object.
     */
    class ChannelParameter extends Base {
        description(): string;
        location(): string;
        schema(): Schema;
    }
    /**
     * Implements functions to deal with a Channel object.
     */
    class Channel extends Base {
        description(): string;
        parameters(): {
            [key: string]: ChannelParameter;
        };
        /**
         * @param name - Name of the parameter.
         */
        parameter(name: string): ChannelParameter;
        hasParameters(): boolean;
        publish(): PublishOperation;
        subscribe(): SubscribeOperation;
        hasPublish(): boolean;
        hasSubscribe(): boolean;
        bindings(): any;
        /**
         * @param name - Name of the binding.
         */
        binding(name: string): any;
    }
    /**
     * Implements functions to deal with a Components object.
     */
    class Components extends Base {
        messages(): {
            [key: string]: Message;
        };
        message(): Message;
        schemas(): {
            [key: string]: Schema;
        };
        schema(): Schema;
        securitySchemes(): {
            [key: string]: SecurityScheme;
        };
        securityScheme(): SecurityScheme;
        parameters(): {
            [key: string]: ChannelParameter;
        };
        parameter(): ChannelParameter;
        correlationIds(): {
            [key: string]: CorrelationId;
        };
        correlationId(): CorrelationId;
        operationTraits(): {
            [key: string]: OperationTrait;
        };
        operationTrait(): OperationTrait;
        messageTraits(): {
            [key: string]: MessageTrait;
        };
        messageTrait(): MessageTrait;
    }
    /**
     * Implements functions to deal with the Contact object.
     */
    class Contact extends Base {
        name(): string;
        url(): string;
        email(): string;
    }
    /**
     * Implements functions to deal with a CorrelationId object.
     */
    class CorrelationId extends Base {
        description(): string;
        location(): string;
    }
    /**
     * Implements functions to deal with an ExternalDocs object.
     */
    class ExternalDocs extends Base {
        description(): string;
        url(): string;
    }
    /**
     * Implements functions to deal with the Info object.
     */
    class Info extends Base {
        title(): string;
        version(): string;
        license(): License;
        contact(): Contact;
    }
    /**
     * Implements functions to deal with the License object.
     */
    class License extends Base {
        name(): string;
        url(): string;
    }
    /**
     * Implements functions to deal with a MessageTrait object.
     */
    class MessageTrait extends Base {
    }
    /**
     * Implements functions to deal with a the common properties that Message and MessageTrait objects have.
     */
    class MessageTraitable extends Base {
        headers(): Schema;
        /**
         * @param name - Name of the header.
         */
        header(name: string): Schema;
        correlationId(): CorrelationId;
        schemaFormat(): string;
        contentType(): string;
        name(): string;
        title(): string;
        summary(): string;
        description(): string;
        externalDocs(): ExternalDocs;
        hasTags(): boolean;
        tags(): Tag[];
        bindings(): any;
        /**
         * @param name - Name of the binding.
         */
        binding(name: string): any;
        examples(): any[];
    }
    /**
     * Implements functions to deal with a Message object.
     */
    class Message extends MessageTraitable {
        uid(): string;
        payload(): Schema;
        originalPayload(): any;
        originalSchemaFormat(): string;
    }
    /**
     * Implements functions to deal with a OAuthFlow object.
     */
    class OAuthFlow extends Base {
        authorizationUrl(): string;
        tokenUrl(): string;
        refreshUrl(): string;
        scopes(): {
            [key: string]: string;
        };
    }
    /**
     * Implements functions to deal with a OperationTrait object.
     */
    class OperationTrait extends OperationTraitable {
    }
    /**
     * Implements functions to deal with the common properties Operation and OperationTrait object have.
     */
    class OperationTraitable extends Base {
        id(): string;
        summary(): string;
        description(): string;
        hasTags(): boolean;
        tags(): Tag[];
        externalDocs(): ExternalDocs;
        bindings(): any;
        /**
         * @param name - Name of the binding.
         */
        binding(name: string): any;
    }
    /**
     * Implements functions to deal with an Operation object.
     */
    class Operation extends OperationTraitable {
        hasMultipleMessages(): boolean;
        messages(): Message[];
        message(): Message;
    }
    /**
     * Implements functions to deal with a PublishOperation object.
     */
    class PublishOperation extends Operation {
        isPublish(): boolean;
        isSubscribe(): boolean;
        kind(): string;
    }
    /**
     * Implements functions to deal with a Schema object.
     */
    class Schema extends Base {
        uid(): string;
        $id(): string;
        multipleOf(): number;
        maximum(): number;
        exclusiveMaximum(): number;
        minimum(): number;
        exclusiveMinimum(): number;
        maxLength(): number;
        minLength(): number;
        pattern(): string;
        maxItems(): number;
        minItems(): number;
        uniqueItems(): boolean;
        maxProperties(): number;
        minProperties(): number;
        required(): string[];
        enum(): any[];
        type(): string | string[];
        allOf(): Schema[];
        oneOf(): Schema[];
        anyOf(): Schema[];
        not(): Schema;
        items(): Schema | Schema[];
        properties(): {
            [key: string]: Schema;
        };
        additionalProperties(): boolean | Schema;
        additionalItems(): Schema;
        patternProperties(): {
            [key: string]: Schema;
        };
        const(): any;
        contains(): Schema;
        dependencies(): {
            [key: string]: Schema | string[];
        };
        propertyNames(): Schema;
        if(): Schema;
        then(): Schema;
        else(): Schema;
        format(): string;
        contentEncoding(): string;
        contentMediaType(): string;
        definitions(): {
            [key: string]: Schema;
        };
        description(): string;
        title(): string;
        default(): any;
        deprecated(): boolean;
        discriminator(): string;
        externalDocs(): ExternalDocs;
        readOnly(): boolean;
        writeOnly(): boolean;
        examples(): any[];
        isCircular(): boolean;
    }
    /**
     * Implements functions to deal with a SecurityScheme object.
     */
    class SecurityScheme extends Base {
        type(): string;
        description(): string;
        name(): string;
        in(): string;
        scheme(): string;
        bearerFormat(): string;
        openIdConnectUrl(): string;
        flows(): {
            [key: string]: OAuthFlow;
        };
    }
    /**
     * Implements functions to deal with a ServerSecurityRequirement object.
     */
    class ServerSecurityRequirement extends Base {
    }
    /**
     * Implements functions to deal with a ServerVariable object.
     */
    class ServerVariable extends Base {
        allowedValues(): any[];
        /**
         * @param name - Name of the variable.
         */
        allows(name: string): boolean;
        hasAllowedValues(): boolean;
        defaultValue(): string;
        hasDefaultValue(): boolean;
        description(): string;
        examples(): string[];
    }
    /**
     * Implements functions to deal with a Server object.
     */
    class Server extends Base {
        description(): string;
        url(): string;
        protocol(): string;
        protocolVersion(): string;
        variables(): {
            [key: string]: ServerVariable;
        };
        /**
         * @param name - Name of the server variable.
         */
        variable(name: string): ServerVariable;
        hasVariables(): boolean;
        security(): ServerSecurityRequirement[];
        bindings(): any;
        /**
         * @param name - Name of the binding.
         */
        binding(name: string): any;
    }
    /**
     * Implements functions to deal with a SubscribeOperation object.
     */
    class SubscribeOperation extends Operation {
        isPublish(): boolean;
        isSubscribe(): boolean;
        kind(): string;
    }
    /**
     * Implements functions to deal with a Tag object.
     */
    class Tag extends Base {
        name(): string;
        description(): string;
        externalDocs(): ExternalDocs;
    }
    /**
     * Parses and validate an AsyncAPI document from YAML or JSON.
     * @param asyncapiYAMLorJSON - An AsyncAPI document in JSON or YAML format.
     * @param [options] - Configuration options.
     * @param [options.path] - Path to the AsyncAPI document. It will be used to resolve relative references. Defaults to current working dir.
     * @param [options.parse] - Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
     * @param [options.resolve] - Options object to pass to {@link https://apidevtools.org/json-schema-ref-parser/docs/options.html|json-schema-ref-parser}.
     * @param [options.applyTraits = true] - Whether to resolve and apply traits or not.
     * @returns The parsed AsyncAPI document.
     */
    function parse(asyncapiYAMLorJSON: string, options?: {
        path?: string;
        parse?: any;
        resolve?: any;
        applyTraits?: any;
    }): Promise<AsyncAPIDocument>;
    /**
     * Fetches an AsyncAPI document from the given URL and passes its content to the `parse` method.
     * @param url - URL where the AsyncAPI document is located.
     * @param [fetchOptions] - Configuration to pass to the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request|fetch} call.
     * @param [options] - Configuration to pass to the {@link module:Parser#parse} method.
     * @returns The parsed AsyncAPI document.
     */
    function parseFromUrl(url: string, fetchOptions?: any, options?: any): Promise<AsyncAPIDocument>;
    /**
     * Registers a new schema parser. Schema parsers are in charge of parsing and transforming payloads to AsyncAPI Schema format.
     * @param schemaFormats - An array of schema formats the given schema parser is able to recognize and transform.
     * @param parserModule - The schema parser module containing parse() and getMimeTypes() functions.
     */
    function registerSchemaParser(schemaFormats: string[], parserModule: any): void;
}

