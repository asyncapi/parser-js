<a name="module_@asyncapi/parser"></a>

## @asyncapi/parser

* [@asyncapi/parser](#module_@asyncapi/parser)
    * _instance_
        * [.ChannelParameter](#module_@asyncapi/parser+ChannelParameter) ⇐ <code>Base</code>
            * [.description()](#module_@asyncapi/parser+ChannelParameter+description) ⇒ <code>string</code>
            * [.location()](#module_@asyncapi/parser+ChannelParameter+location) ⇒ <code>string</code>
            * [.schema()](#module_@asyncapi/parser+ChannelParameter+schema) ⇒ <code>Schema</code>
        * [.Channel](#module_@asyncapi/parser+Channel) ⇐ <code>Base</code>
            * [.description()](#module_@asyncapi/parser+Channel+description) ⇒ <code>string</code>
            * [.parameters()](#module_@asyncapi/parser+Channel+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
            * [.parameter(name)](#module_@asyncapi/parser+Channel+parameter) ⇒ <code>ChannelParameter</code>
            * [.hasParameters()](#module_@asyncapi/parser+Channel+hasParameters) ⇒ <code>boolean</code>
            * [.publish()](#module_@asyncapi/parser+Channel+publish) ⇒ <code>PublishOperation</code>
            * [.subscribe()](#module_@asyncapi/parser+Channel+subscribe) ⇒ <code>SubscribeOperation</code>
            * [.hasPublish()](#module_@asyncapi/parser+Channel+hasPublish) ⇒ <code>boolean</code>
            * [.hasSubscribe()](#module_@asyncapi/parser+Channel+hasSubscribe) ⇒ <code>boolean</code>
            * [.bindings()](#module_@asyncapi/parser+Channel+bindings) ⇒ <code>Object</code>
            * [.binding(name)](#module_@asyncapi/parser+Channel+binding) ⇒ <code>Object</code>
        * [.Components](#module_@asyncapi/parser+Components) ⇐ <code>Base</code>
            * [.messages()](#module_@asyncapi/parser+Components+messages) ⇒ <code>Object.&lt;string, Message&gt;</code>
            * [.message()](#module_@asyncapi/parser+Components+message) ⇒ <code>Message</code>
            * [.schemas()](#module_@asyncapi/parser+Components+schemas) ⇒ <code>Object.&lt;string, Schema&gt;</code>
            * [.schema()](#module_@asyncapi/parser+Components+schema) ⇒ <code>Schema</code>
            * [.securitySchemes()](#module_@asyncapi/parser+Components+securitySchemes) ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
            * [.securityScheme()](#module_@asyncapi/parser+Components+securityScheme) ⇒ <code>SecurityScheme</code>
            * [.parameters()](#module_@asyncapi/parser+Components+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
            * [.parameter()](#module_@asyncapi/parser+Components+parameter) ⇒ <code>ChannelParameter</code>
            * [.correlationIds()](#module_@asyncapi/parser+Components+correlationIds) ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
            * [.correlationId()](#module_@asyncapi/parser+Components+correlationId) ⇒ <code>CorrelationId</code>
            * [.operationTraits()](#module_@asyncapi/parser+Components+operationTraits) ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
            * [.operationTrait()](#module_@asyncapi/parser+Components+operationTrait) ⇒ <code>OperationTrait</code>
            * [.messageTraits()](#module_@asyncapi/parser+Components+messageTraits) ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
            * [.messageTrait()](#module_@asyncapi/parser+Components+messageTrait) ⇒ <code>MessageTrait</code>
        * [.Contact](#module_@asyncapi/parser+Contact) ⇐ <code>Base</code>
            * [.name()](#module_@asyncapi/parser+Contact+name) ⇒ <code>string</code>
            * [.url()](#module_@asyncapi/parser+Contact+url) ⇒ <code>string</code>
            * [.email()](#module_@asyncapi/parser+Contact+email) ⇒ <code>string</code>
        * [.CorrelationId](#module_@asyncapi/parser+CorrelationId) ⇐ <code>Base</code>
            * [.description()](#module_@asyncapi/parser+CorrelationId+description) ⇒ <code>string</code>
            * [.location()](#module_@asyncapi/parser+CorrelationId+location) ⇒ <code>string</code>
        * [.ExternalDocs](#module_@asyncapi/parser+ExternalDocs) ⇐ <code>Base</code>
            * [.description()](#module_@asyncapi/parser+ExternalDocs+description) ⇒ <code>string</code>
            * [.url()](#module_@asyncapi/parser+ExternalDocs+url) ⇒ <code>string</code>
        * [.Info](#module_@asyncapi/parser+Info) ⇐ <code>Base</code>
            * [.title()](#module_@asyncapi/parser+Info+title) ⇒ <code>string</code>
            * [.version()](#module_@asyncapi/parser+Info+version) ⇒ <code>string</code>
            * [.license()](#module_@asyncapi/parser+Info+license) ⇒ <code>License</code>
            * [.contact()](#module_@asyncapi/parser+Info+contact) ⇒ <code>Contact</code>
        * [.License](#module_@asyncapi/parser+License) ⇐ <code>Base</code>
            * [.name()](#module_@asyncapi/parser+License+name) ⇒ <code>string</code>
            * [.url()](#module_@asyncapi/parser+License+url) ⇒ <code>string</code>
        * [.MessageTrait](#module_@asyncapi/parser+MessageTrait) ⇐ <code>Base</code>
        * [.MessageTraitable](#module_@asyncapi/parser+MessageTraitable) ⇐ <code>Base</code>
            * [.headers()](#module_@asyncapi/parser+MessageTraitable+headers) ⇒ <code>Schema</code>
            * [.header(name)](#module_@asyncapi/parser+MessageTraitable+header) ⇒ <code>Schema</code>
            * [.correlationId()](#module_@asyncapi/parser+MessageTraitable+correlationId) ⇒ <code>CorrelationId</code>
            * [.schemaFormat()](#module_@asyncapi/parser+MessageTraitable+schemaFormat) ⇒ <code>string</code>
            * [.contentType()](#module_@asyncapi/parser+MessageTraitable+contentType) ⇒ <code>string</code>
            * [.name()](#module_@asyncapi/parser+MessageTraitable+name) ⇒ <code>string</code>
            * [.title()](#module_@asyncapi/parser+MessageTraitable+title) ⇒ <code>string</code>
            * [.summary()](#module_@asyncapi/parser+MessageTraitable+summary) ⇒ <code>string</code>
            * [.description()](#module_@asyncapi/parser+MessageTraitable+description) ⇒ <code>string</code>
            * [.externalDocs()](#module_@asyncapi/parser+MessageTraitable+externalDocs) ⇒ <code>ExternalDocs</code>
            * [.hasTags()](#module_@asyncapi/parser+MessageTraitable+hasTags) ⇒ <code>boolean</code>
            * [.tags()](#module_@asyncapi/parser+MessageTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
            * [.bindings()](#module_@asyncapi/parser+MessageTraitable+bindings) ⇒ <code>Object</code>
            * [.binding(name)](#module_@asyncapi/parser+MessageTraitable+binding) ⇒ <code>Object</code>
            * [.examples()](#module_@asyncapi/parser+MessageTraitable+examples) ⇒ <code>Array.&lt;any&gt;</code>
        * [.Message](#module_@asyncapi/parser+Message) ⇐ <code>MessageTraitable</code>
            * [.uid()](#module_@asyncapi/parser+Message+uid) ⇒ <code>string</code>
            * [.payload()](#module_@asyncapi/parser+Message+payload) ⇒ <code>Schema</code>
            * [.originalPayload()](#module_@asyncapi/parser+Message+originalPayload) ⇒ <code>any</code>
            * [.originalSchemaFormat()](#module_@asyncapi/parser+Message+originalSchemaFormat) ⇒ <code>string</code>
        * [.OAuthFlow](#module_@asyncapi/parser+OAuthFlow) ⇐ <code>Base</code>
            * [.authorizationUrl()](#module_@asyncapi/parser+OAuthFlow+authorizationUrl) ⇒ <code>string</code>
            * [.tokenUrl()](#module_@asyncapi/parser+OAuthFlow+tokenUrl) ⇒ <code>string</code>
            * [.refreshUrl()](#module_@asyncapi/parser+OAuthFlow+refreshUrl) ⇒ <code>string</code>
            * [.scopes()](#module_@asyncapi/parser+OAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code>
        * [.OperationTrait](#module_@asyncapi/parser+OperationTrait) ⇐ <code>OperationTraitable</code>
        * [.OperationTraitable](#module_@asyncapi/parser+OperationTraitable) ⇐ <code>Base</code>
            * [.id()](#module_@asyncapi/parser+OperationTraitable+id) ⇒ <code>string</code>
            * [.summary()](#module_@asyncapi/parser+OperationTraitable+summary) ⇒ <code>string</code>
            * [.description()](#module_@asyncapi/parser+OperationTraitable+description) ⇒ <code>string</code>
            * [.hasTags()](#module_@asyncapi/parser+OperationTraitable+hasTags) ⇒ <code>boolean</code>
            * [.tags()](#module_@asyncapi/parser+OperationTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
            * [.externalDocs()](#module_@asyncapi/parser+OperationTraitable+externalDocs) ⇒ <code>ExternalDocs</code>
            * [.bindings()](#module_@asyncapi/parser+OperationTraitable+bindings) ⇒ <code>Object</code>
            * [.binding(name)](#module_@asyncapi/parser+OperationTraitable+binding) ⇒ <code>Object</code>
        * [.Operation](#module_@asyncapi/parser+Operation) ⇐ <code>OperationTraitable</code>
            * [.hasMultipleMessages()](#module_@asyncapi/parser+Operation+hasMultipleMessages) ⇒ <code>boolean</code>
            * [.messages()](#module_@asyncapi/parser+Operation+messages) ⇒ <code>Array.&lt;Message&gt;</code>
            * [.message()](#module_@asyncapi/parser+Operation+message) ⇒ <code>Message</code>
        * [.PublishOperation](#module_@asyncapi/parser+PublishOperation) ⇐ <code>Operation</code>
            * [.isPublish()](#module_@asyncapi/parser+PublishOperation+isPublish) ⇒ <code>boolean</code>
            * [.isSubscribe()](#module_@asyncapi/parser+PublishOperation+isSubscribe) ⇒ <code>boolean</code>
            * [.kind()](#module_@asyncapi/parser+PublishOperation+kind) ⇒ <code>string</code>
        * [.Schema](#module_@asyncapi/parser+Schema) ⇐ <code>Base</code>
            * [.uid()](#module_@asyncapi/parser+Schema+uid) ⇒ <code>string</code>
            * [.$id()](#module_@asyncapi/parser+Schema+$id) ⇒ <code>string</code>
            * [.multipleOf()](#module_@asyncapi/parser+Schema+multipleOf) ⇒ <code>number</code>
            * [.maximum()](#module_@asyncapi/parser+Schema+maximum) ⇒ <code>number</code>
            * [.exclusiveMaximum()](#module_@asyncapi/parser+Schema+exclusiveMaximum) ⇒ <code>number</code>
            * [.minimum()](#module_@asyncapi/parser+Schema+minimum) ⇒ <code>number</code>
            * [.exclusiveMinimum()](#module_@asyncapi/parser+Schema+exclusiveMinimum) ⇒ <code>number</code>
            * [.maxLength()](#module_@asyncapi/parser+Schema+maxLength) ⇒ <code>number</code>
            * [.minLength()](#module_@asyncapi/parser+Schema+minLength) ⇒ <code>number</code>
            * [.pattern()](#module_@asyncapi/parser+Schema+pattern) ⇒ <code>string</code>
            * [.maxItems()](#module_@asyncapi/parser+Schema+maxItems) ⇒ <code>number</code>
            * [.minItems()](#module_@asyncapi/parser+Schema+minItems) ⇒ <code>number</code>
            * [.uniqueItems()](#module_@asyncapi/parser+Schema+uniqueItems) ⇒ <code>boolean</code>
            * [.maxProperties()](#module_@asyncapi/parser+Schema+maxProperties) ⇒ <code>number</code>
            * [.minProperties()](#module_@asyncapi/parser+Schema+minProperties) ⇒ <code>number</code>
            * [.required()](#module_@asyncapi/parser+Schema+required) ⇒ <code>Array.&lt;string&gt;</code>
            * [.enum()](#module_@asyncapi/parser+Schema+enum) ⇒ <code>Array.&lt;any&gt;</code>
            * [.type()](#module_@asyncapi/parser+Schema+type) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
            * [.allOf()](#module_@asyncapi/parser+Schema+allOf) ⇒ <code>Array.&lt;Schema&gt;</code>
            * [.oneOf()](#module_@asyncapi/parser+Schema+oneOf) ⇒ <code>Array.&lt;Schema&gt;</code>
            * [.anyOf()](#module_@asyncapi/parser+Schema+anyOf) ⇒ <code>Array.&lt;Schema&gt;</code>
            * [.not()](#module_@asyncapi/parser+Schema+not) ⇒ <code>Schema</code>
            * [.items()](#module_@asyncapi/parser+Schema+items) ⇒ <code>Schema</code> \| <code>Array.&lt;Schema&gt;</code>
            * [.properties()](#module_@asyncapi/parser+Schema+properties) ⇒ <code>Object.&lt;string, Schema&gt;</code>
            * [.additionalProperties()](#module_@asyncapi/parser+Schema+additionalProperties) ⇒ <code>boolean</code> \| <code>Schema</code>
            * [.additionalItems()](#module_@asyncapi/parser+Schema+additionalItems) ⇒ <code>Schema</code>
            * [.patternProperties()](#module_@asyncapi/parser+Schema+patternProperties) ⇒ <code>Object.&lt;string, Schema&gt;</code>
            * [.const()](#module_@asyncapi/parser+Schema+const) ⇒ <code>any</code>
            * [.contains()](#module_@asyncapi/parser+Schema+contains) ⇒ <code>Schema</code>
            * [.dependencies()](#module_@asyncapi/parser+Schema+dependencies) ⇒ <code>Object.&lt;string, (Schema\|Array.&lt;string&gt;)&gt;</code>
            * [.propertyNames()](#module_@asyncapi/parser+Schema+propertyNames) ⇒ <code>Schema</code>
            * [.if()](#module_@asyncapi/parser+Schema+if) ⇒ <code>Schema</code>
            * [.then()](#module_@asyncapi/parser+Schema+then) ⇒ <code>Schema</code>
            * [.else()](#module_@asyncapi/parser+Schema+else) ⇒ <code>Schema</code>
            * [.format()](#module_@asyncapi/parser+Schema+format) ⇒ <code>string</code>
            * [.contentEncoding()](#module_@asyncapi/parser+Schema+contentEncoding) ⇒ <code>string</code>
            * [.contentMediaType()](#module_@asyncapi/parser+Schema+contentMediaType) ⇒ <code>string</code>
            * [.definitions()](#module_@asyncapi/parser+Schema+definitions) ⇒ <code>Object.&lt;string, Schema&gt;</code>
            * [.description()](#module_@asyncapi/parser+Schema+description) ⇒ <code>string</code>
            * [.title()](#module_@asyncapi/parser+Schema+title) ⇒ <code>string</code>
            * [.default()](#module_@asyncapi/parser+Schema+default) ⇒ <code>any</code>
            * [.deprecated()](#module_@asyncapi/parser+Schema+deprecated) ⇒ <code>boolean</code>
            * [.discriminator()](#module_@asyncapi/parser+Schema+discriminator) ⇒ <code>string</code>
            * [.externalDocs()](#module_@asyncapi/parser+Schema+externalDocs) ⇒ <code>ExternalDocs</code>
            * [.readOnly()](#module_@asyncapi/parser+Schema+readOnly) ⇒ <code>boolean</code>
            * [.writeOnly()](#module_@asyncapi/parser+Schema+writeOnly) ⇒ <code>boolean</code>
            * [.examples()](#module_@asyncapi/parser+Schema+examples) ⇒ <code>Array.&lt;any&gt;</code>
            * [.isCircular()](#module_@asyncapi/parser+Schema+isCircular) ⇒ <code>boolean</code>
        * [.SecurityScheme](#module_@asyncapi/parser+SecurityScheme) ⇐ <code>Base</code>
            * [.type()](#module_@asyncapi/parser+SecurityScheme+type) ⇒ <code>string</code>
            * [.description()](#module_@asyncapi/parser+SecurityScheme+description) ⇒ <code>string</code>
            * [.name()](#module_@asyncapi/parser+SecurityScheme+name) ⇒ <code>string</code>
            * [.in()](#module_@asyncapi/parser+SecurityScheme+in) ⇒ <code>string</code>
            * [.scheme()](#module_@asyncapi/parser+SecurityScheme+scheme) ⇒ <code>string</code>
            * [.bearerFormat()](#module_@asyncapi/parser+SecurityScheme+bearerFormat) ⇒ <code>string</code>
            * [.openIdConnectUrl()](#module_@asyncapi/parser+SecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
            * [.flows()](#module_@asyncapi/parser+SecurityScheme+flows) ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>
        * [.ServerSecurityRequirement](#module_@asyncapi/parser+ServerSecurityRequirement) ⇐ <code>Base</code>
        * [.ServerVariable](#module_@asyncapi/parser+ServerVariable) ⇐ <code>Base</code>
            * [.allowedValues()](#module_@asyncapi/parser+ServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
            * [.allows(name)](#module_@asyncapi/parser+ServerVariable+allows) ⇒ <code>boolean</code>
            * [.hasAllowedValues()](#module_@asyncapi/parser+ServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
            * [.defaultValue()](#module_@asyncapi/parser+ServerVariable+defaultValue) ⇒ <code>string</code>
            * [.hasDefaultValue()](#module_@asyncapi/parser+ServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+ServerVariable+description) ⇒ <code>string</code>
            * [.examples()](#module_@asyncapi/parser+ServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>
        * [.Server](#module_@asyncapi/parser+Server) ⇐ <code>Base</code>
            * [.description()](#module_@asyncapi/parser+Server+description) ⇒ <code>string</code>
            * [.url()](#module_@asyncapi/parser+Server+url) ⇒ <code>string</code>
            * [.protocol()](#module_@asyncapi/parser+Server+protocol) ⇒ <code>string</code>
            * [.protocolVersion()](#module_@asyncapi/parser+Server+protocolVersion) ⇒ <code>string</code>
            * [.variables()](#module_@asyncapi/parser+Server+variables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
            * [.variable(name)](#module_@asyncapi/parser+Server+variable) ⇒ <code>ServerVariable</code>
            * [.hasVariables()](#module_@asyncapi/parser+Server+hasVariables) ⇒ <code>boolean</code>
            * [.security()](#module_@asyncapi/parser+Server+security) ⇒ <code>Array.&lt;ServerSecurityRequirement&gt;</code>
            * [.bindings()](#module_@asyncapi/parser+Server+bindings) ⇒ <code>Object</code>
            * [.binding(name)](#module_@asyncapi/parser+Server+binding) ⇒ <code>Object</code>
        * [.SubscribeOperation](#module_@asyncapi/parser+SubscribeOperation) ⇐ <code>Operation</code>
            * [.isPublish()](#module_@asyncapi/parser+SubscribeOperation+isPublish) ⇒ <code>boolean</code>
            * [.isSubscribe()](#module_@asyncapi/parser+SubscribeOperation+isSubscribe) ⇒ <code>boolean</code>
            * [.kind()](#module_@asyncapi/parser+SubscribeOperation+kind) ⇒ <code>string</code>
        * [.Tag](#module_@asyncapi/parser+Tag) ⇐ <code>Base</code>
            * [.name()](#module_@asyncapi/parser+Tag+name) ⇒ <code>string</code>
            * [.description()](#module_@asyncapi/parser+Tag+description) ⇒ <code>string</code>
            * [.externalDocs()](#module_@asyncapi/parser+Tag+externalDocs) ⇒ <code>ExternalDocs</code>
    * _inner_
        * [~ParserError](#module_@asyncapi/parser+ParserError) ⇐ <code>Error</code>
            * [new ParserError(definition)](#new_module_@asyncapi/parser+ParserError_new)
            * [.toJS()](#module_@asyncapi/parser+ParserError+toJS)
        * [~AsyncAPIDocument](#module_@asyncapi/parser+AsyncAPIDocument) ⇐ <code>Base</code>
            * [.version()](#module_@asyncapi/parser+AsyncAPIDocument+version) ⇒ <code>string</code>
            * [.info()](#module_@asyncapi/parser+AsyncAPIDocument+info) ⇒ <code>Info</code>
            * [.id()](#module_@asyncapi/parser+AsyncAPIDocument+id) ⇒ <code>string</code>
            * [.hasServers()](#module_@asyncapi/parser+AsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
            * [.servers()](#module_@asyncapi/parser+AsyncAPIDocument+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
            * [.server(name)](#module_@asyncapi/parser+AsyncAPIDocument+server) ⇒ <code>Server</code>
            * [.hasChannels()](#module_@asyncapi/parser+AsyncAPIDocument+hasChannels) ⇒ <code>boolean</code>
            * [.channels()](#module_@asyncapi/parser+AsyncAPIDocument+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
            * [.channelNames()](#module_@asyncapi/parser+AsyncAPIDocument+channelNames) ⇒ <code>Array.&lt;string&gt;</code>
            * [.channel(name)](#module_@asyncapi/parser+AsyncAPIDocument+channel) ⇒ <code>Channel</code>
            * [.defaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+defaultContentType) ⇒ <code>string</code>
            * [.hasComponents()](#module_@asyncapi/parser+AsyncAPIDocument+hasComponents) ⇒ <code>boolean</code>
            * [.components()](#module_@asyncapi/parser+AsyncAPIDocument+components) ⇒ <code>Components</code>
            * [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
            * [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
            * [.hasMessages()](#module_@asyncapi/parser+AsyncAPIDocument+hasMessages) ⇒ <code>boolean</code>
            * [.allMessages()](#module_@asyncapi/parser+AsyncAPIDocument+allMessages) ⇒ <code>Map.&lt;string, Message&gt;</code>
            * [.allSchemas()](#module_@asyncapi/parser+AsyncAPIDocument+allSchemas) ⇒ <code>Map.&lt;string, Schema&gt;</code>
            * [.hasCircular()](#module_@asyncapi/parser+AsyncAPIDocument+hasCircular) ⇒ <code>boolean</code>
        * [~Base](#module_@asyncapi/parser+Base)
            * [.json()](#module_@asyncapi/parser+Base+json) ⇒ <code>Any</code>
        * [~parse(asyncapiYAMLorJSON, [options])](#module_@asyncapi/parser..parse) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
        * [~parseFromUrl(url, [fetchOptions], [options])](#module_@asyncapi/parser..parseFromUrl) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
        * [~registerSchemaParser(parserModule)](#module_@asyncapi/parser..registerSchemaParser)
        * [~customChannelsOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options)](#module_@asyncapi/parser..customChannelsOperations)

<a name="module_@asyncapi/parser+ChannelParameter"></a>

### @asyncapi/parser.ChannelParameter ⇐ <code>Base</code>
Implements functions to deal with a ChannelParameter object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.ChannelParameter](#module_@asyncapi/parser+ChannelParameter) ⇐ <code>Base</code>
    * [.description()](#module_@asyncapi/parser+ChannelParameter+description) ⇒ <code>string</code>
    * [.location()](#module_@asyncapi/parser+ChannelParameter+location) ⇒ <code>string</code>
    * [.schema()](#module_@asyncapi/parser+ChannelParameter+schema) ⇒ <code>Schema</code>

<a name="module_@asyncapi/parser+ChannelParameter+description"></a>

#### channelParameter.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
<a name="module_@asyncapi/parser+ChannelParameter+location"></a>

#### channelParameter.location() ⇒ <code>string</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
<a name="module_@asyncapi/parser+ChannelParameter+schema"></a>

#### channelParameter.schema() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
<a name="module_@asyncapi/parser+Channel"></a>

### @asyncapi/parser.Channel ⇐ <code>Base</code>
Implements functions to deal with a Channel object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Channel](#module_@asyncapi/parser+Channel) ⇐ <code>Base</code>
    * [.description()](#module_@asyncapi/parser+Channel+description) ⇒ <code>string</code>
    * [.parameters()](#module_@asyncapi/parser+Channel+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
    * [.parameter(name)](#module_@asyncapi/parser+Channel+parameter) ⇒ <code>ChannelParameter</code>
    * [.hasParameters()](#module_@asyncapi/parser+Channel+hasParameters) ⇒ <code>boolean</code>
    * [.publish()](#module_@asyncapi/parser+Channel+publish) ⇒ <code>PublishOperation</code>
    * [.subscribe()](#module_@asyncapi/parser+Channel+subscribe) ⇒ <code>SubscribeOperation</code>
    * [.hasPublish()](#module_@asyncapi/parser+Channel+hasPublish) ⇒ <code>boolean</code>
    * [.hasSubscribe()](#module_@asyncapi/parser+Channel+hasSubscribe) ⇒ <code>boolean</code>
    * [.bindings()](#module_@asyncapi/parser+Channel+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#module_@asyncapi/parser+Channel+binding) ⇒ <code>Object</code>

<a name="module_@asyncapi/parser+Channel+description"></a>

#### channel.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+parameters"></a>

#### channel.parameters() ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+parameter"></a>

#### channel.parameter(name) ⇒ <code>ChannelParameter</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the parameter. |

<a name="module_@asyncapi/parser+Channel+hasParameters"></a>

#### channel.hasParameters() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+publish"></a>

#### channel.publish() ⇒ <code>PublishOperation</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+subscribe"></a>

#### channel.subscribe() ⇒ <code>SubscribeOperation</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+hasPublish"></a>

#### channel.hasPublish() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+hasSubscribe"></a>

#### channel.hasSubscribe() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+bindings"></a>

#### channel.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+binding"></a>

#### channel.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+Components"></a>

### @asyncapi/parser.Components ⇐ <code>Base</code>
Implements functions to deal with a Components object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Components](#module_@asyncapi/parser+Components) ⇐ <code>Base</code>
    * [.messages()](#module_@asyncapi/parser+Components+messages) ⇒ <code>Object.&lt;string, Message&gt;</code>
    * [.message()](#module_@asyncapi/parser+Components+message) ⇒ <code>Message</code>
    * [.schemas()](#module_@asyncapi/parser+Components+schemas) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.schema()](#module_@asyncapi/parser+Components+schema) ⇒ <code>Schema</code>
    * [.securitySchemes()](#module_@asyncapi/parser+Components+securitySchemes) ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
    * [.securityScheme()](#module_@asyncapi/parser+Components+securityScheme) ⇒ <code>SecurityScheme</code>
    * [.parameters()](#module_@asyncapi/parser+Components+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
    * [.parameter()](#module_@asyncapi/parser+Components+parameter) ⇒ <code>ChannelParameter</code>
    * [.correlationIds()](#module_@asyncapi/parser+Components+correlationIds) ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
    * [.correlationId()](#module_@asyncapi/parser+Components+correlationId) ⇒ <code>CorrelationId</code>
    * [.operationTraits()](#module_@asyncapi/parser+Components+operationTraits) ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
    * [.operationTrait()](#module_@asyncapi/parser+Components+operationTrait) ⇒ <code>OperationTrait</code>
    * [.messageTraits()](#module_@asyncapi/parser+Components+messageTraits) ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
    * [.messageTrait()](#module_@asyncapi/parser+Components+messageTrait) ⇒ <code>MessageTrait</code>

<a name="module_@asyncapi/parser+Components+messages"></a>

#### components.messages() ⇒ <code>Object.&lt;string, Message&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+message"></a>

#### components.message() ⇒ <code>Message</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+schemas"></a>

#### components.schemas() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+schema"></a>

#### components.schema() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+securitySchemes"></a>

#### components.securitySchemes() ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+securityScheme"></a>

#### components.securityScheme() ⇒ <code>SecurityScheme</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+parameters"></a>

#### components.parameters() ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+parameter"></a>

#### components.parameter() ⇒ <code>ChannelParameter</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+correlationIds"></a>

#### components.correlationIds() ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+correlationId"></a>

#### components.correlationId() ⇒ <code>CorrelationId</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+operationTraits"></a>

#### components.operationTraits() ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+operationTrait"></a>

#### components.operationTrait() ⇒ <code>OperationTrait</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+messageTraits"></a>

#### components.messageTraits() ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+messageTrait"></a>

#### components.messageTrait() ⇒ <code>MessageTrait</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Contact"></a>

### @asyncapi/parser.Contact ⇐ <code>Base</code>
Implements functions to deal with the Contact object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Contact](#module_@asyncapi/parser+Contact) ⇐ <code>Base</code>
    * [.name()](#module_@asyncapi/parser+Contact+name) ⇒ <code>string</code>
    * [.url()](#module_@asyncapi/parser+Contact+url) ⇒ <code>string</code>
    * [.email()](#module_@asyncapi/parser+Contact+email) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+Contact+name"></a>

#### contact.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
<a name="module_@asyncapi/parser+Contact+url"></a>

#### contact.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
<a name="module_@asyncapi/parser+Contact+email"></a>

#### contact.email() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
<a name="module_@asyncapi/parser+CorrelationId"></a>

### @asyncapi/parser.CorrelationId ⇐ <code>Base</code>
Implements functions to deal with a CorrelationId object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.CorrelationId](#module_@asyncapi/parser+CorrelationId) ⇐ <code>Base</code>
    * [.description()](#module_@asyncapi/parser+CorrelationId+description) ⇒ <code>string</code>
    * [.location()](#module_@asyncapi/parser+CorrelationId+location) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+CorrelationId+description"></a>

#### correlationId.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
<a name="module_@asyncapi/parser+CorrelationId+location"></a>

#### correlationId.location() ⇒ <code>string</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
<a name="module_@asyncapi/parser+ExternalDocs"></a>

### @asyncapi/parser.ExternalDocs ⇐ <code>Base</code>
Implements functions to deal with an ExternalDocs object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.ExternalDocs](#module_@asyncapi/parser+ExternalDocs) ⇐ <code>Base</code>
    * [.description()](#module_@asyncapi/parser+ExternalDocs+description) ⇒ <code>string</code>
    * [.url()](#module_@asyncapi/parser+ExternalDocs+url) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+ExternalDocs+description"></a>

#### externalDocs.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
<a name="module_@asyncapi/parser+ExternalDocs+url"></a>

#### externalDocs.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
<a name="module_@asyncapi/parser+Info"></a>

### @asyncapi/parser.Info ⇐ <code>Base</code>
Implements functions to deal with the Info object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Info](#module_@asyncapi/parser+Info) ⇐ <code>Base</code>
    * [.title()](#module_@asyncapi/parser+Info+title) ⇒ <code>string</code>
    * [.version()](#module_@asyncapi/parser+Info+version) ⇒ <code>string</code>
    * [.license()](#module_@asyncapi/parser+Info+license) ⇒ <code>License</code>
    * [.contact()](#module_@asyncapi/parser+Info+contact) ⇒ <code>Contact</code>

<a name="module_@asyncapi/parser+Info+title"></a>

#### info.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+version"></a>

#### info.version() ⇒ <code>string</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+license"></a>

#### info.license() ⇒ <code>License</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+contact"></a>

#### info.contact() ⇒ <code>Contact</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+License"></a>

### @asyncapi/parser.License ⇐ <code>Base</code>
Implements functions to deal with the License object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.License](#module_@asyncapi/parser+License) ⇐ <code>Base</code>
    * [.name()](#module_@asyncapi/parser+License+name) ⇒ <code>string</code>
    * [.url()](#module_@asyncapi/parser+License+url) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+License+name"></a>

#### license.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
<a name="module_@asyncapi/parser+License+url"></a>

#### license.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
<a name="module_@asyncapi/parser+MessageTrait"></a>

### @asyncapi/parser.MessageTrait ⇐ <code>Base</code>
Implements functions to deal with a MessageTrait object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
<a name="module_@asyncapi/parser+MessageTraitable"></a>

### @asyncapi/parser.MessageTraitable ⇐ <code>Base</code>
Implements functions to deal with a the common properties that Message and MessageTrait objects have.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.MessageTraitable](#module_@asyncapi/parser+MessageTraitable) ⇐ <code>Base</code>
    * [.headers()](#module_@asyncapi/parser+MessageTraitable+headers) ⇒ <code>Schema</code>
    * [.header(name)](#module_@asyncapi/parser+MessageTraitable+header) ⇒ <code>Schema</code>
    * [.correlationId()](#module_@asyncapi/parser+MessageTraitable+correlationId) ⇒ <code>CorrelationId</code>
    * [.schemaFormat()](#module_@asyncapi/parser+MessageTraitable+schemaFormat) ⇒ <code>string</code>
    * [.contentType()](#module_@asyncapi/parser+MessageTraitable+contentType) ⇒ <code>string</code>
    * [.name()](#module_@asyncapi/parser+MessageTraitable+name) ⇒ <code>string</code>
    * [.title()](#module_@asyncapi/parser+MessageTraitable+title) ⇒ <code>string</code>
    * [.summary()](#module_@asyncapi/parser+MessageTraitable+summary) ⇒ <code>string</code>
    * [.description()](#module_@asyncapi/parser+MessageTraitable+description) ⇒ <code>string</code>
    * [.externalDocs()](#module_@asyncapi/parser+MessageTraitable+externalDocs) ⇒ <code>ExternalDocs</code>
    * [.hasTags()](#module_@asyncapi/parser+MessageTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+MessageTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.bindings()](#module_@asyncapi/parser+MessageTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#module_@asyncapi/parser+MessageTraitable+binding) ⇒ <code>Object</code>
    * [.examples()](#module_@asyncapi/parser+MessageTraitable+examples) ⇒ <code>Array.&lt;any&gt;</code>

<a name="module_@asyncapi/parser+MessageTraitable+headers"></a>

#### messageTraitable.headers() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+header"></a>

#### messageTraitable.header(name) ⇒ <code>Schema</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the header. |

<a name="module_@asyncapi/parser+MessageTraitable+correlationId"></a>

#### messageTraitable.correlationId() ⇒ <code>CorrelationId</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+schemaFormat"></a>

#### messageTraitable.schemaFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+contentType"></a>

#### messageTraitable.contentType() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+name"></a>

#### messageTraitable.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+title"></a>

#### messageTraitable.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+summary"></a>

#### messageTraitable.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+description"></a>

#### messageTraitable.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+externalDocs"></a>

#### messageTraitable.externalDocs() ⇒ <code>ExternalDocs</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+hasTags"></a>

#### messageTraitable.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+tags"></a>

#### messageTraitable.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+bindings"></a>

#### messageTraitable.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+binding"></a>

#### messageTraitable.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+MessageTraitable+examples"></a>

#### messageTraitable.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+Message"></a>

### @asyncapi/parser.Message ⇐ <code>MessageTraitable</code>
Implements functions to deal with a Message object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>MessageTraitable</code>  

* [.Message](#module_@asyncapi/parser+Message) ⇐ <code>MessageTraitable</code>
    * [.uid()](#module_@asyncapi/parser+Message+uid) ⇒ <code>string</code>
    * [.payload()](#module_@asyncapi/parser+Message+payload) ⇒ <code>Schema</code>
    * [.originalPayload()](#module_@asyncapi/parser+Message+originalPayload) ⇒ <code>any</code>
    * [.originalSchemaFormat()](#module_@asyncapi/parser+Message+originalSchemaFormat) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+Message+uid"></a>

#### message.uid() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+Message+payload"></a>

#### message.payload() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+Message+originalPayload"></a>

#### message.originalPayload() ⇒ <code>any</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+Message+originalSchemaFormat"></a>

#### message.originalSchemaFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+OAuthFlow"></a>

### @asyncapi/parser.OAuthFlow ⇐ <code>Base</code>
Implements functions to deal with a OAuthFlow object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.OAuthFlow](#module_@asyncapi/parser+OAuthFlow) ⇐ <code>Base</code>
    * [.authorizationUrl()](#module_@asyncapi/parser+OAuthFlow+authorizationUrl) ⇒ <code>string</code>
    * [.tokenUrl()](#module_@asyncapi/parser+OAuthFlow+tokenUrl) ⇒ <code>string</code>
    * [.refreshUrl()](#module_@asyncapi/parser+OAuthFlow+refreshUrl) ⇒ <code>string</code>
    * [.scopes()](#module_@asyncapi/parser+OAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code>

<a name="module_@asyncapi/parser+OAuthFlow+authorizationUrl"></a>

#### oAuthFlow.authorizationUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
<a name="module_@asyncapi/parser+OAuthFlow+tokenUrl"></a>

#### oAuthFlow.tokenUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
<a name="module_@asyncapi/parser+OAuthFlow+refreshUrl"></a>

#### oAuthFlow.refreshUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
<a name="module_@asyncapi/parser+OAuthFlow+scopes"></a>

#### oAuthFlow.scopes() ⇒ <code>Object.&lt;string, string&gt;</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
<a name="module_@asyncapi/parser+OperationTrait"></a>

### @asyncapi/parser.OperationTrait ⇐ <code>OperationTraitable</code>
Implements functions to deal with a OperationTrait object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>OperationTraitable</code>  
<a name="module_@asyncapi/parser+OperationTraitable"></a>

### @asyncapi/parser.OperationTraitable ⇐ <code>Base</code>
Implements functions to deal with the common properties Operation and OperationTrait object have.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.OperationTraitable](#module_@asyncapi/parser+OperationTraitable) ⇐ <code>Base</code>
    * [.id()](#module_@asyncapi/parser+OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#module_@asyncapi/parser+OperationTraitable+summary) ⇒ <code>string</code>
    * [.description()](#module_@asyncapi/parser+OperationTraitable+description) ⇒ <code>string</code>
    * [.hasTags()](#module_@asyncapi/parser+OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+OperationTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.externalDocs()](#module_@asyncapi/parser+OperationTraitable+externalDocs) ⇒ <code>ExternalDocs</code>
    * [.bindings()](#module_@asyncapi/parser+OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#module_@asyncapi/parser+OperationTraitable+binding) ⇒ <code>Object</code>

<a name="module_@asyncapi/parser+OperationTraitable+id"></a>

#### operationTraitable.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+summary"></a>

#### operationTraitable.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+description"></a>

#### operationTraitable.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+hasTags"></a>

#### operationTraitable.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+tags"></a>

#### operationTraitable.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+externalDocs"></a>

#### operationTraitable.externalDocs() ⇒ <code>ExternalDocs</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+bindings"></a>

#### operationTraitable.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+binding"></a>

#### operationTraitable.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+Operation"></a>

### @asyncapi/parser.Operation ⇐ <code>OperationTraitable</code>
Implements functions to deal with an Operation object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>OperationTraitable</code>  

* [.Operation](#module_@asyncapi/parser+Operation) ⇐ <code>OperationTraitable</code>
    * [.hasMultipleMessages()](#module_@asyncapi/parser+Operation+hasMultipleMessages) ⇒ <code>boolean</code>
    * [.messages()](#module_@asyncapi/parser+Operation+messages) ⇒ <code>Array.&lt;Message&gt;</code>
    * [.message()](#module_@asyncapi/parser+Operation+message) ⇒ <code>Message</code>

<a name="module_@asyncapi/parser+Operation+hasMultipleMessages"></a>

#### operation.hasMultipleMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+messages"></a>

#### operation.messages() ⇒ <code>Array.&lt;Message&gt;</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+message"></a>

#### operation.message() ⇒ <code>Message</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+PublishOperation"></a>

### @asyncapi/parser.PublishOperation ⇐ <code>Operation</code>
Implements functions to deal with a PublishOperation object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Operation</code>  

* [.PublishOperation](#module_@asyncapi/parser+PublishOperation) ⇐ <code>Operation</code>
    * [.isPublish()](#module_@asyncapi/parser+PublishOperation+isPublish) ⇒ <code>boolean</code>
    * [.isSubscribe()](#module_@asyncapi/parser+PublishOperation+isSubscribe) ⇒ <code>boolean</code>
    * [.kind()](#module_@asyncapi/parser+PublishOperation+kind) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+PublishOperation+isPublish"></a>

#### publishOperation.isPublish() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PublishOperation</code>](#module_@asyncapi/parser+PublishOperation)  
<a name="module_@asyncapi/parser+PublishOperation+isSubscribe"></a>

#### publishOperation.isSubscribe() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PublishOperation</code>](#module_@asyncapi/parser+PublishOperation)  
<a name="module_@asyncapi/parser+PublishOperation+kind"></a>

#### publishOperation.kind() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublishOperation</code>](#module_@asyncapi/parser+PublishOperation)  
<a name="module_@asyncapi/parser+Schema"></a>

### @asyncapi/parser.Schema ⇐ <code>Base</code>
Implements functions to deal with a Schema object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Schema](#module_@asyncapi/parser+Schema) ⇐ <code>Base</code>
    * [.uid()](#module_@asyncapi/parser+Schema+uid) ⇒ <code>string</code>
    * [.$id()](#module_@asyncapi/parser+Schema+$id) ⇒ <code>string</code>
    * [.multipleOf()](#module_@asyncapi/parser+Schema+multipleOf) ⇒ <code>number</code>
    * [.maximum()](#module_@asyncapi/parser+Schema+maximum) ⇒ <code>number</code>
    * [.exclusiveMaximum()](#module_@asyncapi/parser+Schema+exclusiveMaximum) ⇒ <code>number</code>
    * [.minimum()](#module_@asyncapi/parser+Schema+minimum) ⇒ <code>number</code>
    * [.exclusiveMinimum()](#module_@asyncapi/parser+Schema+exclusiveMinimum) ⇒ <code>number</code>
    * [.maxLength()](#module_@asyncapi/parser+Schema+maxLength) ⇒ <code>number</code>
    * [.minLength()](#module_@asyncapi/parser+Schema+minLength) ⇒ <code>number</code>
    * [.pattern()](#module_@asyncapi/parser+Schema+pattern) ⇒ <code>string</code>
    * [.maxItems()](#module_@asyncapi/parser+Schema+maxItems) ⇒ <code>number</code>
    * [.minItems()](#module_@asyncapi/parser+Schema+minItems) ⇒ <code>number</code>
    * [.uniqueItems()](#module_@asyncapi/parser+Schema+uniqueItems) ⇒ <code>boolean</code>
    * [.maxProperties()](#module_@asyncapi/parser+Schema+maxProperties) ⇒ <code>number</code>
    * [.minProperties()](#module_@asyncapi/parser+Schema+minProperties) ⇒ <code>number</code>
    * [.required()](#module_@asyncapi/parser+Schema+required) ⇒ <code>Array.&lt;string&gt;</code>
    * [.enum()](#module_@asyncapi/parser+Schema+enum) ⇒ <code>Array.&lt;any&gt;</code>
    * [.type()](#module_@asyncapi/parser+Schema+type) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * [.allOf()](#module_@asyncapi/parser+Schema+allOf) ⇒ <code>Array.&lt;Schema&gt;</code>
    * [.oneOf()](#module_@asyncapi/parser+Schema+oneOf) ⇒ <code>Array.&lt;Schema&gt;</code>
    * [.anyOf()](#module_@asyncapi/parser+Schema+anyOf) ⇒ <code>Array.&lt;Schema&gt;</code>
    * [.not()](#module_@asyncapi/parser+Schema+not) ⇒ <code>Schema</code>
    * [.items()](#module_@asyncapi/parser+Schema+items) ⇒ <code>Schema</code> \| <code>Array.&lt;Schema&gt;</code>
    * [.properties()](#module_@asyncapi/parser+Schema+properties) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.additionalProperties()](#module_@asyncapi/parser+Schema+additionalProperties) ⇒ <code>boolean</code> \| <code>Schema</code>
    * [.additionalItems()](#module_@asyncapi/parser+Schema+additionalItems) ⇒ <code>Schema</code>
    * [.patternProperties()](#module_@asyncapi/parser+Schema+patternProperties) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.const()](#module_@asyncapi/parser+Schema+const) ⇒ <code>any</code>
    * [.contains()](#module_@asyncapi/parser+Schema+contains) ⇒ <code>Schema</code>
    * [.dependencies()](#module_@asyncapi/parser+Schema+dependencies) ⇒ <code>Object.&lt;string, (Schema\|Array.&lt;string&gt;)&gt;</code>
    * [.propertyNames()](#module_@asyncapi/parser+Schema+propertyNames) ⇒ <code>Schema</code>
    * [.if()](#module_@asyncapi/parser+Schema+if) ⇒ <code>Schema</code>
    * [.then()](#module_@asyncapi/parser+Schema+then) ⇒ <code>Schema</code>
    * [.else()](#module_@asyncapi/parser+Schema+else) ⇒ <code>Schema</code>
    * [.format()](#module_@asyncapi/parser+Schema+format) ⇒ <code>string</code>
    * [.contentEncoding()](#module_@asyncapi/parser+Schema+contentEncoding) ⇒ <code>string</code>
    * [.contentMediaType()](#module_@asyncapi/parser+Schema+contentMediaType) ⇒ <code>string</code>
    * [.definitions()](#module_@asyncapi/parser+Schema+definitions) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.description()](#module_@asyncapi/parser+Schema+description) ⇒ <code>string</code>
    * [.title()](#module_@asyncapi/parser+Schema+title) ⇒ <code>string</code>
    * [.default()](#module_@asyncapi/parser+Schema+default) ⇒ <code>any</code>
    * [.deprecated()](#module_@asyncapi/parser+Schema+deprecated) ⇒ <code>boolean</code>
    * [.discriminator()](#module_@asyncapi/parser+Schema+discriminator) ⇒ <code>string</code>
    * [.externalDocs()](#module_@asyncapi/parser+Schema+externalDocs) ⇒ <code>ExternalDocs</code>
    * [.readOnly()](#module_@asyncapi/parser+Schema+readOnly) ⇒ <code>boolean</code>
    * [.writeOnly()](#module_@asyncapi/parser+Schema+writeOnly) ⇒ <code>boolean</code>
    * [.examples()](#module_@asyncapi/parser+Schema+examples) ⇒ <code>Array.&lt;any&gt;</code>
    * [.isCircular()](#module_@asyncapi/parser+Schema+isCircular) ⇒ <code>boolean</code>

<a name="module_@asyncapi/parser+Schema+uid"></a>

#### schema.uid() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+$id"></a>

#### schema.$id() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+multipleOf"></a>

#### schema.multipleOf() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+maximum"></a>

#### schema.maximum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+exclusiveMaximum"></a>

#### schema.exclusiveMaximum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+minimum"></a>

#### schema.minimum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+exclusiveMinimum"></a>

#### schema.exclusiveMinimum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+maxLength"></a>

#### schema.maxLength() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+minLength"></a>

#### schema.minLength() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+pattern"></a>

#### schema.pattern() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+maxItems"></a>

#### schema.maxItems() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+minItems"></a>

#### schema.minItems() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+uniqueItems"></a>

#### schema.uniqueItems() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+maxProperties"></a>

#### schema.maxProperties() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+minProperties"></a>

#### schema.minProperties() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+required"></a>

#### schema.required() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+enum"></a>

#### schema.enum() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+type"></a>

#### schema.type() ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+allOf"></a>

#### schema.allOf() ⇒ <code>Array.&lt;Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+oneOf"></a>

#### schema.oneOf() ⇒ <code>Array.&lt;Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+anyOf"></a>

#### schema.anyOf() ⇒ <code>Array.&lt;Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+not"></a>

#### schema.not() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+items"></a>

#### schema.items() ⇒ <code>Schema</code> \| <code>Array.&lt;Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+properties"></a>

#### schema.properties() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+additionalProperties"></a>

#### schema.additionalProperties() ⇒ <code>boolean</code> \| <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+additionalItems"></a>

#### schema.additionalItems() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+patternProperties"></a>

#### schema.patternProperties() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+const"></a>

#### schema.const() ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+contains"></a>

#### schema.contains() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+dependencies"></a>

#### schema.dependencies() ⇒ <code>Object.&lt;string, (Schema\|Array.&lt;string&gt;)&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+propertyNames"></a>

#### schema.propertyNames() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+if"></a>

#### schema.if() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+then"></a>

#### schema.then() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+else"></a>

#### schema.else() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+format"></a>

#### schema.format() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+contentEncoding"></a>

#### schema.contentEncoding() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+contentMediaType"></a>

#### schema.contentMediaType() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+definitions"></a>

#### schema.definitions() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+description"></a>

#### schema.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+title"></a>

#### schema.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+default"></a>

#### schema.default() ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+deprecated"></a>

#### schema.deprecated() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+discriminator"></a>

#### schema.discriminator() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+externalDocs"></a>

#### schema.externalDocs() ⇒ <code>ExternalDocs</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+readOnly"></a>

#### schema.readOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+writeOnly"></a>

#### schema.writeOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+examples"></a>

#### schema.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+isCircular"></a>

#### schema.isCircular() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+SecurityScheme"></a>

### @asyncapi/parser.SecurityScheme ⇐ <code>Base</code>
Implements functions to deal with a SecurityScheme object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.SecurityScheme](#module_@asyncapi/parser+SecurityScheme) ⇐ <code>Base</code>
    * [.type()](#module_@asyncapi/parser+SecurityScheme+type) ⇒ <code>string</code>
    * [.description()](#module_@asyncapi/parser+SecurityScheme+description) ⇒ <code>string</code>
    * [.name()](#module_@asyncapi/parser+SecurityScheme+name) ⇒ <code>string</code>
    * [.in()](#module_@asyncapi/parser+SecurityScheme+in) ⇒ <code>string</code>
    * [.scheme()](#module_@asyncapi/parser+SecurityScheme+scheme) ⇒ <code>string</code>
    * [.bearerFormat()](#module_@asyncapi/parser+SecurityScheme+bearerFormat) ⇒ <code>string</code>
    * [.openIdConnectUrl()](#module_@asyncapi/parser+SecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
    * [.flows()](#module_@asyncapi/parser+SecurityScheme+flows) ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>

<a name="module_@asyncapi/parser+SecurityScheme+type"></a>

#### securityScheme.type() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+description"></a>

#### securityScheme.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+name"></a>

#### securityScheme.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+in"></a>

#### securityScheme.in() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+scheme"></a>

#### securityScheme.scheme() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+bearerFormat"></a>

#### securityScheme.bearerFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+openIdConnectUrl"></a>

#### securityScheme.openIdConnectUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+SecurityScheme+flows"></a>

#### securityScheme.flows() ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
<a name="module_@asyncapi/parser+ServerSecurityRequirement"></a>

### @asyncapi/parser.ServerSecurityRequirement ⇐ <code>Base</code>
Implements functions to deal with a ServerSecurityRequirement object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
<a name="module_@asyncapi/parser+ServerVariable"></a>

### @asyncapi/parser.ServerVariable ⇐ <code>Base</code>
Implements functions to deal with a ServerVariable object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.ServerVariable](#module_@asyncapi/parser+ServerVariable) ⇐ <code>Base</code>
    * [.allowedValues()](#module_@asyncapi/parser+ServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
    * [.allows(name)](#module_@asyncapi/parser+ServerVariable+allows) ⇒ <code>boolean</code>
    * [.hasAllowedValues()](#module_@asyncapi/parser+ServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
    * [.defaultValue()](#module_@asyncapi/parser+ServerVariable+defaultValue) ⇒ <code>string</code>
    * [.hasDefaultValue()](#module_@asyncapi/parser+ServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+ServerVariable+description) ⇒ <code>string</code>
    * [.examples()](#module_@asyncapi/parser+ServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>

<a name="module_@asyncapi/parser+ServerVariable+allowedValues"></a>

#### serverVariable.allowedValues() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+ServerVariable+allows"></a>

#### serverVariable.allows(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the variable. |

<a name="module_@asyncapi/parser+ServerVariable+hasAllowedValues"></a>

#### serverVariable.hasAllowedValues() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+ServerVariable+defaultValue"></a>

#### serverVariable.defaultValue() ⇒ <code>string</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+ServerVariable+hasDefaultValue"></a>

#### serverVariable.hasDefaultValue() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+ServerVariable+description"></a>

#### serverVariable.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+ServerVariable+examples"></a>

#### serverVariable.examples() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+Server"></a>

### @asyncapi/parser.Server ⇐ <code>Base</code>
Implements functions to deal with a Server object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Server](#module_@asyncapi/parser+Server) ⇐ <code>Base</code>
    * [.description()](#module_@asyncapi/parser+Server+description) ⇒ <code>string</code>
    * [.url()](#module_@asyncapi/parser+Server+url) ⇒ <code>string</code>
    * [.protocol()](#module_@asyncapi/parser+Server+protocol) ⇒ <code>string</code>
    * [.protocolVersion()](#module_@asyncapi/parser+Server+protocolVersion) ⇒ <code>string</code>
    * [.variables()](#module_@asyncapi/parser+Server+variables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
    * [.variable(name)](#module_@asyncapi/parser+Server+variable) ⇒ <code>ServerVariable</code>
    * [.hasVariables()](#module_@asyncapi/parser+Server+hasVariables) ⇒ <code>boolean</code>
    * [.security()](#module_@asyncapi/parser+Server+security) ⇒ <code>Array.&lt;ServerSecurityRequirement&gt;</code>
    * [.bindings()](#module_@asyncapi/parser+Server+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#module_@asyncapi/parser+Server+binding) ⇒ <code>Object</code>

<a name="module_@asyncapi/parser+Server+description"></a>

#### server.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+url"></a>

#### server.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+protocol"></a>

#### server.protocol() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+protocolVersion"></a>

#### server.protocolVersion() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+variables"></a>

#### server.variables() ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+variable"></a>

#### server.variable(name) ⇒ <code>ServerVariable</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server variable. |

<a name="module_@asyncapi/parser+Server+hasVariables"></a>

#### server.hasVariables() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+security"></a>

#### server.security() ⇒ <code>Array.&lt;ServerSecurityRequirement&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+bindings"></a>

#### server.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
<a name="module_@asyncapi/parser+Server+binding"></a>

#### server.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+SubscribeOperation"></a>

### @asyncapi/parser.SubscribeOperation ⇐ <code>Operation</code>
Implements functions to deal with a SubscribeOperation object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Operation</code>  

* [.SubscribeOperation](#module_@asyncapi/parser+SubscribeOperation) ⇐ <code>Operation</code>
    * [.isPublish()](#module_@asyncapi/parser+SubscribeOperation+isPublish) ⇒ <code>boolean</code>
    * [.isSubscribe()](#module_@asyncapi/parser+SubscribeOperation+isSubscribe) ⇒ <code>boolean</code>
    * [.kind()](#module_@asyncapi/parser+SubscribeOperation+kind) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+SubscribeOperation+isPublish"></a>

#### subscribeOperation.isPublish() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#module_@asyncapi/parser+SubscribeOperation)  
<a name="module_@asyncapi/parser+SubscribeOperation+isSubscribe"></a>

#### subscribeOperation.isSubscribe() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#module_@asyncapi/parser+SubscribeOperation)  
<a name="module_@asyncapi/parser+SubscribeOperation+kind"></a>

#### subscribeOperation.kind() ⇒ <code>string</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#module_@asyncapi/parser+SubscribeOperation)  
<a name="module_@asyncapi/parser+Tag"></a>

### @asyncapi/parser.Tag ⇐ <code>Base</code>
Implements functions to deal with a Tag object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [.Tag](#module_@asyncapi/parser+Tag) ⇐ <code>Base</code>
    * [.name()](#module_@asyncapi/parser+Tag+name) ⇒ <code>string</code>
    * [.description()](#module_@asyncapi/parser+Tag+description) ⇒ <code>string</code>
    * [.externalDocs()](#module_@asyncapi/parser+Tag+externalDocs) ⇒ <code>ExternalDocs</code>

<a name="module_@asyncapi/parser+Tag+name"></a>

#### tag.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
<a name="module_@asyncapi/parser+Tag+description"></a>

#### tag.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
<a name="module_@asyncapi/parser+Tag+externalDocs"></a>

#### tag.externalDocs() ⇒ <code>ExternalDocs</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
<a name="module_@asyncapi/parser+ParserError"></a>

### @asyncapi/parser~ParserError ⇐ <code>Error</code>
Represents an error while trying to parse an AsyncAPI document.

**Kind**: inner class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Error</code>  

* [~ParserError](#module_@asyncapi/parser+ParserError) ⇐ <code>Error</code>
    * [new ParserError(definition)](#new_module_@asyncapi/parser+ParserError_new)
    * [.toJS()](#module_@asyncapi/parser+ParserError+toJS)

<a name="new_module_@asyncapi/parser+ParserError_new"></a>

#### new ParserError(definition)
Instantiates an error


| Param | Type | Description |
| --- | --- | --- |
| definition | <code>Object</code> |  |
| definition.type | <code>String</code> | The type of the error. |
| definition.title | <code>String</code> | The message of the error. |
| [definition.detail] | <code>String</code> | A string containing more detailed information about the error. |
| [definition.parsedJSON] | <code>Object</code> | The resulting JSON after YAML transformation. Or the JSON object if the this was the initial format. |
| [definition.validationErrors] | <code>Array.&lt;Object&gt;</code> | The errors resulting from the validation. For more information, see https://www.npmjs.com/package/better-ajv-errors. |
| definition.validationErrors.title | <code>String</code> | A validation error message. |
| definition.validationErrors.jsonPointer | <code>String</code> | The path to the field that contains the error. Uses JSON Pointer format. |
| definition.validationErrors.startLine | <code>Number</code> | The line where the error starts in the AsyncAPI document. |
| definition.validationErrors.startColumn | <code>Number</code> | The column where the error starts in the AsyncAPI document. |
| definition.validationErrors.startOffset | <code>Number</code> | The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document. |
| definition.validationErrors.endLine | <code>Number</code> | The line where the error ends in the AsyncAPI document. |
| definition.validationErrors.endColumn | <code>Number</code> | The column where the error ends in the AsyncAPI document. |
| definition.validationErrors.endOffset | <code>Number</code> | The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document. |
| [definition.location] | <code>Object</code> | Error location details after trying to parse an invalid JSON or YAML document. |
| definition.location.startLine | <code>Number</code> | The line of the YAML/JSON document where the error starts. |
| definition.location.startColumn | <code>Number</code> | The column of the YAML/JSON document where the error starts. |
| definition.location.startOffset | <code>Number</code> | The offset (starting from the beginning of the document) where the error starts in the YAML/JSON AsyncAPI document. |
| [definition.refs] | <code>Array.&lt;Object&gt;</code> | Error details after trying to resolve $ref's. |
| definition.refs.title | <code>String</code> | A validation error message. |
| definition.refs.jsonPointer | <code>String</code> | The path to the field that contains the error. Uses JSON Pointer format. |
| definition.refs.startLine | <code>Number</code> | The line where the error starts in the AsyncAPI document. |
| definition.refs.startColumn | <code>Number</code> | The column where the error starts in the AsyncAPI document. |
| definition.refs.startOffset | <code>Number</code> | The offset (starting from the beginning of the document) where the error starts in the AsyncAPI document. |
| definition.refs.endLine | <code>Number</code> | The line where the error ends in the AsyncAPI document. |
| definition.refs.endColumn | <code>Number</code> | The column where the error ends in the AsyncAPI document. |
| definition.refs.endOffset | <code>Number</code> | The offset (starting from the beginning of the document) where the error ends in the AsyncAPI document. |

<a name="module_@asyncapi/parser+ParserError+toJS"></a>

#### parserError.toJS()
Returns a JS object representation of the error.

**Kind**: instance method of [<code>ParserError</code>](#module_@asyncapi/parser+ParserError)  
<a name="module_@asyncapi/parser+AsyncAPIDocument"></a>

### @asyncapi/parser~AsyncAPIDocument ⇐ <code>Base</code>
Implements functions to deal with the AsyncAPI document.

**Kind**: inner class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  

* [~AsyncAPIDocument](#module_@asyncapi/parser+AsyncAPIDocument) ⇐ <code>Base</code>
    * [.version()](#module_@asyncapi/parser+AsyncAPIDocument+version) ⇒ <code>string</code>
    * [.info()](#module_@asyncapi/parser+AsyncAPIDocument+info) ⇒ <code>Info</code>
    * [.id()](#module_@asyncapi/parser+AsyncAPIDocument+id) ⇒ <code>string</code>
    * [.hasServers()](#module_@asyncapi/parser+AsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
    * [.servers()](#module_@asyncapi/parser+AsyncAPIDocument+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
    * [.server(name)](#module_@asyncapi/parser+AsyncAPIDocument+server) ⇒ <code>Server</code>
    * [.hasChannels()](#module_@asyncapi/parser+AsyncAPIDocument+hasChannels) ⇒ <code>boolean</code>
    * [.channels()](#module_@asyncapi/parser+AsyncAPIDocument+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
    * [.channelNames()](#module_@asyncapi/parser+AsyncAPIDocument+channelNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.channel(name)](#module_@asyncapi/parser+AsyncAPIDocument+channel) ⇒ <code>Channel</code>
    * [.defaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+defaultContentType) ⇒ <code>string</code>
    * [.hasComponents()](#module_@asyncapi/parser+AsyncAPIDocument+hasComponents) ⇒ <code>boolean</code>
    * [.components()](#module_@asyncapi/parser+AsyncAPIDocument+components) ⇒ <code>Components</code>
    * [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.hasMessages()](#module_@asyncapi/parser+AsyncAPIDocument+hasMessages) ⇒ <code>boolean</code>
    * [.allMessages()](#module_@asyncapi/parser+AsyncAPIDocument+allMessages) ⇒ <code>Map.&lt;string, Message&gt;</code>
    * [.allSchemas()](#module_@asyncapi/parser+AsyncAPIDocument+allSchemas) ⇒ <code>Map.&lt;string, Schema&gt;</code>
    * [.hasCircular()](#module_@asyncapi/parser+AsyncAPIDocument+hasCircular) ⇒ <code>boolean</code>

<a name="module_@asyncapi/parser+AsyncAPIDocument+version"></a>

#### asyncAPIDocument.version() ⇒ <code>string</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+info"></a>

#### asyncAPIDocument.info() ⇒ <code>Info</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+id"></a>

#### asyncAPIDocument.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasServers"></a>

#### asyncAPIDocument.hasServers() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+servers"></a>

#### asyncAPIDocument.servers() ⇒ <code>Object.&lt;string, Server&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+server"></a>

#### asyncAPIDocument.server(name) ⇒ <code>Server</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasChannels"></a>

#### asyncAPIDocument.hasChannels() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+channels"></a>

#### asyncAPIDocument.channels() ⇒ <code>Object.&lt;string, Channel&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+channelNames"></a>

#### asyncAPIDocument.channelNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+channel"></a>

#### asyncAPIDocument.channel(name) ⇒ <code>Channel</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the channel. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+defaultContentType"></a>

#### asyncAPIDocument.defaultContentType() ⇒ <code>string</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasComponents"></a>

#### asyncAPIDocument.hasComponents() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+components"></a>

#### asyncAPIDocument.components() ⇒ <code>Components</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasTags"></a>

#### asyncAPIDocument.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+tags"></a>

#### asyncAPIDocument.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasMessages"></a>

#### asyncAPIDocument.hasMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+allMessages"></a>

#### asyncAPIDocument.allMessages() ⇒ <code>Map.&lt;string, Message&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+allSchemas"></a>

#### asyncAPIDocument.allSchemas() ⇒ <code>Map.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasCircular"></a>

#### asyncAPIDocument.hasCircular() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+Base"></a>

### @asyncapi/parser~Base
Implements common functionality for all the models.

**Kind**: inner class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
<a name="module_@asyncapi/parser+Base+json"></a>

#### base.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Base</code>](#module_@asyncapi/parser+Base)  
<a name="module_@asyncapi/parser..parse"></a>

### @asyncapi/parser~parse(asyncapiYAMLorJSON, [options]) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
Parses and validate an AsyncAPI document from YAML or JSON.

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Returns**: <code>Promise.&lt;AsyncAPIDocument&gt;</code> - The parsed AsyncAPI document.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| asyncapiYAMLorJSON | <code>String</code> |  | An AsyncAPI document in JSON or YAML format. |
| [options] | <code>Object</code> |  | Configuration options. |
| [options.path] | <code>String</code> |  | Path to the AsyncAPI document. It will be used to resolve relative references. Defaults to current working dir. |
| [options.parse] | <code>Object</code> |  | Options object to pass to [json-schema-ref-parser](https://apidevtools.org/json-schema-ref-parser/docs/options.html). |
| [options.resolve] | <code>Object</code> |  | Options object to pass to [json-schema-ref-parser](https://apidevtools.org/json-schema-ref-parser/docs/options.html). |
| [options.applyTraits] | <code>Object</code> | <code>true</code> | Whether to resolve and apply traits or not. |

<a name="module_@asyncapi/parser..parseFromUrl"></a>

### @asyncapi/parser~parseFromUrl(url, [fetchOptions], [options]) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
Fetches an AsyncAPI document from the given URL and passes its content to the `parse` method.

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Returns**: <code>Promise.&lt;AsyncAPIDocument&gt;</code> - The parsed AsyncAPI document.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL where the AsyncAPI document is located. |
| [fetchOptions] | <code>Object</code> | Configuration to pass to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Request) call. |
| [options] | <code>Object</code> | Configuration to pass to the [module:Parser#parse](module:Parser#parse) method. |

<a name="module_@asyncapi/parser..registerSchemaParser"></a>

### @asyncapi/parser~registerSchemaParser(parserModule)
Registers a new schema parser. Schema parsers are in charge of parsing and transforming payloads to AsyncAPI Schema format.

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  

| Param | Type | Description |
| --- | --- | --- |
| parserModule | <code>Object</code> | The schema parser module containing parse() and getMimeTypes() functions. |

<a name="module_@asyncapi/parser..customChannelsOperations"></a>

### @asyncapi/parser~customChannelsOperations(parsedJSON, asyncapiYAMLorJSON, initialFormat, options)
Triggers additional operations on the AsyncAPI channels like traits application or message validation and conversion

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  

| Param | Type | Description |
| --- | --- | --- |
| parsedJSON | <code>Object</code> | parsed AsyncAPI document |
| asyncapiYAMLorJSON | <code>String</code> | AsyncAPI document in string |
| initialFormat | <code>String</code> | information of the document was oryginally JSON or YAML |
| options | <code>Object</code> | Configuration options. |

