## Modules

<dl>
<dt><a href="#module_@asyncapi/parser">@asyncapi/parser</a></dt>
<dd></dd>
</dl>

## Mixins

<dl>
<dt><a href="#MixinBindings">MixinBindings</a></dt>
<dd><p>Implements functions to deal with the common Bindings object.</p>
</dd>
<dt><a href="#MixinDescription">MixinDescription</a></dt>
<dd><p>Implements functions to deal with the description field.</p>
</dd>
<dt><a href="#MixinExternalDocs">MixinExternalDocs</a></dt>
<dd><p>Implements functions to deal with the ExternalDocs object.</p>
</dd>
<dt><a href="#MixinSpecificationExtensions">MixinSpecificationExtensions</a></dt>
<dd><p>Implements functions to deal with the SpecificationExtensions object.</p>
</dd>
<dt><a href="#MixinTags">MixinTags</a></dt>
<dd><p>Implements functions to deal with the Tags object.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SchemaIteratorCallbackType">SchemaIteratorCallbackType</a></dt>
<dd><p>The different kind of stages when crawling a schema.</p>
</dd>
<dt><a href="#SchemaTypesToIterate">SchemaTypesToIterate</a></dt>
<dd><p>The different types of schemas you can iterate</p>
</dd>
</dl>

<a name="module_@asyncapi/parser"></a>

## @asyncapi/parser

* [@asyncapi/parser](#module_@asyncapi/parser)
    * _instance_
        * [.ParserError](#module_@asyncapi/parser+ParserError) ⇐ <code>Error</code>
            * [new ParserError(definition)](#new_module_@asyncapi/parser+ParserError_new)
            * [.toJS()](#module_@asyncapi/parser+ParserError+toJS)
        * [.AsyncAPIDocument](#module_@asyncapi/parser+AsyncAPIDocument) ⇐ <code>Base</code>
            * _instance_
                * [.version()](#module_@asyncapi/parser+AsyncAPIDocument+version) ⇒ <code>string</code>
                * [.info()](#module_@asyncapi/parser+AsyncAPIDocument+info) ⇒ <code>Info</code>
                * [.id()](#module_@asyncapi/parser+AsyncAPIDocument+id) ⇒ <code>string</code>
                * [.hasServers()](#module_@asyncapi/parser+AsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
                * [.servers()](#module_@asyncapi/parser+AsyncAPIDocument+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
                * [.serverNames()](#module_@asyncapi/parser+AsyncAPIDocument+serverNames) ⇒ <code>Array.&lt;string&gt;</code>
                * [.server(name)](#module_@asyncapi/parser+AsyncAPIDocument+server) ⇒ <code>Server</code>
                * [.hasDefaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+hasDefaultContentType) ⇒ <code>boolean</code>
                * [.defaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+defaultContentType) ⇒ <code>string</code> \| <code>null</code>
                * [.hasChannels()](#module_@asyncapi/parser+AsyncAPIDocument+hasChannels) ⇒ <code>boolean</code>
                * [.channels()](#module_@asyncapi/parser+AsyncAPIDocument+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
                * [.channelNames()](#module_@asyncapi/parser+AsyncAPIDocument+channelNames) ⇒ <code>Array.&lt;string&gt;</code>
                * [.channel(name)](#module_@asyncapi/parser+AsyncAPIDocument+channel) ⇒ <code>Channel</code>
                * [.hasComponents()](#module_@asyncapi/parser+AsyncAPIDocument+hasComponents) ⇒ <code>boolean</code>
                * [.components()](#module_@asyncapi/parser+AsyncAPIDocument+components) ⇒ <code>Components</code>
                * [.hasMessages()](#module_@asyncapi/parser+AsyncAPIDocument+hasMessages) ⇒ <code>boolean</code>
                * [.allMessages()](#module_@asyncapi/parser+AsyncAPIDocument+allMessages) ⇒ <code>Map.&lt;string, Message&gt;</code>
                * [.allSchemas()](#module_@asyncapi/parser+AsyncAPIDocument+allSchemas) ⇒ <code>Map.&lt;string, Schema&gt;</code>
                * [.hasCircular()](#module_@asyncapi/parser+AsyncAPIDocument+hasCircular) ⇒ <code>boolean</code>
                * [.traverseSchemas(callback, schemaTypesToIterate)](#module_@asyncapi/parser+AsyncAPIDocument+traverseSchemas)
                * [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
                * [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
                * [.tagNames()](#module_@asyncapi/parser+AsyncAPIDocument+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
                * [.hasTag(name)](#module_@asyncapi/parser+AsyncAPIDocument+hasTag) ⇒ <code>boolean</code>
                * [.tag(name)](#module_@asyncapi/parser+AsyncAPIDocument+tag) ⇒ <code>Tag</code> \| <code>null</code>
                * [.hasExternalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs) ⇒ <code>boolean</code>
                * [.externalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
                * [.hasExtensions()](#module_@asyncapi/parser+AsyncAPIDocument+hasExtensions) ⇒ <code>boolean</code>
                * [.extensions()](#module_@asyncapi/parser+AsyncAPIDocument+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
                * [.extensionKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
                * [.extKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
                * [.hasExtension(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExtension) ⇒ <code>boolean</code>
                * [.extension(key)](#module_@asyncapi/parser+AsyncAPIDocument+extension) ⇒ <code>any</code>
                * [.hasExt(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExt) ⇒ <code>boolean</code>
                * [.ext(key)](#module_@asyncapi/parser+AsyncAPIDocument+ext) ⇒ <code>any</code>
                * [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
                * [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
                * [.tagNames()](#module_@asyncapi/parser+AsyncAPIDocument+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
                * [.hasTag(name)](#module_@asyncapi/parser+AsyncAPIDocument+hasTag) ⇒ <code>boolean</code>
                * [.tag(name)](#module_@asyncapi/parser+AsyncAPIDocument+tag) ⇒ <code>Tag</code> \| <code>null</code>
                * [.hasExternalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs) ⇒ <code>boolean</code>
                * [.externalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
                * [.hasExtensions()](#module_@asyncapi/parser+AsyncAPIDocument+hasExtensions) ⇒ <code>boolean</code>
                * [.extensions()](#module_@asyncapi/parser+AsyncAPIDocument+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
                * [.extensionKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
                * [.extKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
                * [.hasExtension(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExtension) ⇒ <code>boolean</code>
                * [.extension(key)](#module_@asyncapi/parser+AsyncAPIDocument+extension) ⇒ <code>any</code>
                * [.hasExt(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExt) ⇒ <code>boolean</code>
                * [.ext(key)](#module_@asyncapi/parser+AsyncAPIDocument+ext) ⇒ <code>any</code>
            * _static_
                * [.stringify(doc, [space])](#module_@asyncapi/parser+AsyncAPIDocument.stringify) ⇒ <code>string</code>
                * [.parse(doc)](#module_@asyncapi/parser+AsyncAPIDocument.parse) ⇒ <code>AsyncAPIDocument</code>
        * [.Base](#module_@asyncapi/parser+Base)
            * [.json([key])](#module_@asyncapi/parser+Base+json) ⇒ <code>any</code>
        * [.ChannelParameter](#module_@asyncapi/parser+ChannelParameter) ⇐ <code>Base</code>
            * [.location()](#module_@asyncapi/parser+ChannelParameter+location) ⇒ <code>string</code>
            * [.schema()](#module_@asyncapi/parser+ChannelParameter+schema) ⇒ <code>Schema</code>
            * [.hasDescription()](#module_@asyncapi/parser+ChannelParameter+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+ChannelParameter+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+ChannelParameter+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+ChannelParameter+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+ChannelParameter+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+ChannelParameter+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+ChannelParameter+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+ChannelParameter+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+ChannelParameter+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+ChannelParameter+ext) ⇒ <code>any</code>
        * [.Channel](#module_@asyncapi/parser+Channel) ⇐ <code>Base</code>
            * [.parameters()](#module_@asyncapi/parser+Channel+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
            * [.parameter(name)](#module_@asyncapi/parser+Channel+parameter) ⇒ <code>ChannelParameter</code>
            * [.hasParameters()](#module_@asyncapi/parser+Channel+hasParameters) ⇒ <code>boolean</code>
            * [.hasServers()](#module_@asyncapi/parser+Channel+hasServers) ⇒ <code>boolean</code>
            * [.servers()](#module_@asyncapi/parser+Channel+servers) ⇒ <code>Array.&lt;String&gt;</code>
            * [.server(index)](#module_@asyncapi/parser+Channel+server) ⇒ <code>String</code>
            * [.publish()](#module_@asyncapi/parser+Channel+publish) ⇒ <code>PublishOperation</code>
            * [.subscribe()](#module_@asyncapi/parser+Channel+subscribe) ⇒ <code>SubscribeOperation</code>
            * [.hasPublish()](#module_@asyncapi/parser+Channel+hasPublish) ⇒ <code>boolean</code>
            * [.hasSubscribe()](#module_@asyncapi/parser+Channel+hasSubscribe) ⇒ <code>boolean</code>
            * [.hasDescription()](#module_@asyncapi/parser+Channel+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+Channel+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasBindings()](#module_@asyncapi/parser+Channel+hasBindings) ⇒ <code>boolean</code>
            * [.bindings()](#module_@asyncapi/parser+Channel+bindings) ⇒ <code>Object</code>
            * [.bindingProtocols()](#module_@asyncapi/parser+Channel+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasBinding(name)](#module_@asyncapi/parser+Channel+hasBinding) ⇒ <code>boolean</code>
            * [.binding(name)](#module_@asyncapi/parser+Channel+binding) ⇒ <code>Object</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Channel+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Channel+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Channel+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Channel+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Channel+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Channel+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Channel+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Channel+ext) ⇒ <code>any</code>
        * [.Components](#module_@asyncapi/parser+Components) ⇐ <code>Base</code>
            * [.channels()](#module_@asyncapi/parser+Components+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
            * [.hasChannels()](#module_@asyncapi/parser+Components+hasChannels) ⇒ <code>boolean</code>
            * [.channel(name)](#module_@asyncapi/parser+Components+channel) ⇒ <code>Channel</code>
            * [.messages()](#module_@asyncapi/parser+Components+messages) ⇒ <code>Object.&lt;string, Message&gt;</code>
            * [.hasMessages()](#module_@asyncapi/parser+Components+hasMessages) ⇒ <code>boolean</code>
            * [.message(name)](#module_@asyncapi/parser+Components+message) ⇒ <code>Message</code>
            * [.schemas()](#module_@asyncapi/parser+Components+schemas) ⇒ <code>Object.&lt;string, Schema&gt;</code>
            * [.hasSchemas()](#module_@asyncapi/parser+Components+hasSchemas) ⇒ <code>boolean</code>
            * [.schema(name)](#module_@asyncapi/parser+Components+schema) ⇒ <code>Schema</code>
            * [.securitySchemes()](#module_@asyncapi/parser+Components+securitySchemes) ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
            * [.hasSecuritySchemes()](#module_@asyncapi/parser+Components+hasSecuritySchemes) ⇒ <code>boolean</code>
            * [.securityScheme(name)](#module_@asyncapi/parser+Components+securityScheme) ⇒ <code>SecurityScheme</code>
            * [.servers()](#module_@asyncapi/parser+Components+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
            * [.hasServers()](#module_@asyncapi/parser+Components+hasServers) ⇒ <code>boolean</code>
            * [.server(name)](#module_@asyncapi/parser+Components+server) ⇒ <code>Server</code>
            * [.parameters()](#module_@asyncapi/parser+Components+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
            * [.hasParameters()](#module_@asyncapi/parser+Components+hasParameters) ⇒ <code>boolean</code>
            * [.parameter(name)](#module_@asyncapi/parser+Components+parameter) ⇒ <code>ChannelParameter</code>
            * [.correlationIds()](#module_@asyncapi/parser+Components+correlationIds) ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
            * [.hasCorrelationIds()](#module_@asyncapi/parser+Components+hasCorrelationIds) ⇒ <code>boolean</code>
            * [.correlationId(name)](#module_@asyncapi/parser+Components+correlationId) ⇒ <code>CorrelationId</code>
            * [.operationTraits()](#module_@asyncapi/parser+Components+operationTraits) ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
            * [.hasOperationTraits()](#module_@asyncapi/parser+Components+hasOperationTraits) ⇒ <code>boolean</code>
            * [.operationTrait(name)](#module_@asyncapi/parser+Components+operationTrait) ⇒ <code>OperationTrait</code>
            * [.messageTraits()](#module_@asyncapi/parser+Components+messageTraits) ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
            * [.hasMessageTraits()](#module_@asyncapi/parser+Components+hasMessageTraits) ⇒ <code>boolean</code>
            * [.messageTrait(name)](#module_@asyncapi/parser+Components+messageTrait) ⇒ <code>MessageTrait</code>
            * [.serverVariables()](#module_@asyncapi/parser+Components+serverVariables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
            * [.hasServerVariables()](#module_@asyncapi/parser+Components+hasServerVariables) ⇒ <code>boolean</code>
            * [.serverVariable(name)](#module_@asyncapi/parser+Components+serverVariable) ⇒ <code>ServerVariable</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Components+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Components+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Components+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Components+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Components+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Components+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Components+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Components+ext) ⇒ <code>any</code>
        * [.Contact](#module_@asyncapi/parser+Contact) ⇐ <code>Base</code>
            * [.name()](#module_@asyncapi/parser+Contact+name) ⇒ <code>string</code>
            * [.url()](#module_@asyncapi/parser+Contact+url) ⇒ <code>string</code>
            * [.email()](#module_@asyncapi/parser+Contact+email) ⇒ <code>string</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Contact+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Contact+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Contact+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Contact+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Contact+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Contact+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Contact+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Contact+ext) ⇒ <code>any</code>
        * [.CorrelationId](#module_@asyncapi/parser+CorrelationId) ⇐ <code>Base</code>
            * [.location()](#module_@asyncapi/parser+CorrelationId+location) ⇒ <code>string</code>
            * [.hasDescription()](#module_@asyncapi/parser+CorrelationId+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+CorrelationId+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+CorrelationId+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+CorrelationId+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+CorrelationId+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+CorrelationId+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+CorrelationId+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+CorrelationId+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+CorrelationId+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+CorrelationId+ext) ⇒ <code>any</code>
        * [.ExternalDocs](#module_@asyncapi/parser+ExternalDocs) ⇐ <code>Base</code>
            * [.url()](#module_@asyncapi/parser+ExternalDocs+url) ⇒ <code>string</code>
            * [.hasDescription()](#module_@asyncapi/parser+ExternalDocs+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+ExternalDocs+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+ExternalDocs+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+ExternalDocs+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+ExternalDocs+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+ExternalDocs+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+ExternalDocs+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+ExternalDocs+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+ExternalDocs+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+ExternalDocs+ext) ⇒ <code>any</code>
        * [.Info](#module_@asyncapi/parser+Info) ⇐ <code>Base</code>
            * [.title()](#module_@asyncapi/parser+Info+title) ⇒ <code>string</code>
            * [.version()](#module_@asyncapi/parser+Info+version) ⇒ <code>string</code>
            * [.termsOfService()](#module_@asyncapi/parser+Info+termsOfService) ⇒ <code>string</code> \| <code>undefined</code>
            * [.license()](#module_@asyncapi/parser+Info+license) ⇒ <code>License</code>
            * [.contact()](#module_@asyncapi/parser+Info+contact) ⇒ <code>Contact</code>
            * [.hasDescription()](#module_@asyncapi/parser+Info+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+Info+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Info+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Info+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Info+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Info+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Info+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Info+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Info+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Info+ext) ⇒ <code>any</code>
        * [.License](#module_@asyncapi/parser+License) ⇐ <code>Base</code>
            * [.name()](#module_@asyncapi/parser+License+name) ⇒ <code>string</code>
            * [.url()](#module_@asyncapi/parser+License+url) ⇒ <code>string</code>
            * [.hasExtensions()](#module_@asyncapi/parser+License+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+License+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+License+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+License+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+License+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+License+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+License+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+License+ext) ⇒ <code>any</code>
        * [.MessageTrait](#module_@asyncapi/parser+MessageTrait) ⇐ <code>MessageTraitable</code>
        * [.MessageTraitable](#module_@asyncapi/parser+MessageTraitable) ⇐ <code>Base</code>
            * [.headers()](#module_@asyncapi/parser+MessageTraitable+headers) ⇒ <code>Schema</code>
            * [.header(name)](#module_@asyncapi/parser+MessageTraitable+header) ⇒ <code>Schema</code>
            * [.id()](#module_@asyncapi/parser+MessageTraitable+id) ⇒ <code>string</code>
            * [.correlationId()](#module_@asyncapi/parser+MessageTraitable+correlationId) ⇒ <code>CorrelationId</code>
            * [.schemaFormat()](#module_@asyncapi/parser+MessageTraitable+schemaFormat) ⇒ <code>string</code>
            * [.contentType()](#module_@asyncapi/parser+MessageTraitable+contentType) ⇒ <code>string</code>
            * [.name()](#module_@asyncapi/parser+MessageTraitable+name) ⇒ <code>string</code>
            * [.title()](#module_@asyncapi/parser+MessageTraitable+title) ⇒ <code>string</code>
            * [.summary()](#module_@asyncapi/parser+MessageTraitable+summary) ⇒ <code>string</code>
            * [.examples()](#module_@asyncapi/parser+MessageTraitable+examples) ⇒ <code>Array.&lt;any&gt;</code>
            * [.hasDescription()](#module_@asyncapi/parser+MessageTraitable+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+MessageTraitable+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasTags()](#module_@asyncapi/parser+MessageTraitable+hasTags) ⇒ <code>boolean</code>
            * [.tags()](#module_@asyncapi/parser+MessageTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
            * [.tagNames()](#module_@asyncapi/parser+MessageTraitable+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasTag(name)](#module_@asyncapi/parser+MessageTraitable+hasTag) ⇒ <code>boolean</code>
            * [.tag(name)](#module_@asyncapi/parser+MessageTraitable+tag) ⇒ <code>Tag</code> \| <code>null</code>
            * [.hasExternalDocs()](#module_@asyncapi/parser+MessageTraitable+hasExternalDocs) ⇒ <code>boolean</code>
            * [.externalDocs()](#module_@asyncapi/parser+MessageTraitable+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
            * [.hasBindings()](#module_@asyncapi/parser+MessageTraitable+hasBindings) ⇒ <code>boolean</code>
            * [.bindings()](#module_@asyncapi/parser+MessageTraitable+bindings) ⇒ <code>Object</code>
            * [.bindingProtocols()](#module_@asyncapi/parser+MessageTraitable+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasBinding(name)](#module_@asyncapi/parser+MessageTraitable+hasBinding) ⇒ <code>boolean</code>
            * [.binding(name)](#module_@asyncapi/parser+MessageTraitable+binding) ⇒ <code>Object</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+MessageTraitable+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+MessageTraitable+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+MessageTraitable+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+MessageTraitable+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+MessageTraitable+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+MessageTraitable+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+MessageTraitable+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+MessageTraitable+ext) ⇒ <code>any</code>
        * [.Message](#module_@asyncapi/parser+Message) ⇐ <code>MessageTraitable</code>
            * [.uid()](#module_@asyncapi/parser+Message+uid) ⇒ <code>string</code>
            * [.payload()](#module_@asyncapi/parser+Message+payload) ⇒ <code>Schema</code>
            * [.traits()](#module_@asyncapi/parser+Message+traits) ⇒ <code>Array.&lt;MessageTrait&gt;</code>
            * [.hasTraits()](#module_@asyncapi/parser+Message+hasTraits) ⇒ <code>boolean</code>
            * [.originalPayload()](#module_@asyncapi/parser+Message+originalPayload) ⇒ <code>any</code>
            * [.originalSchemaFormat()](#module_@asyncapi/parser+Message+originalSchemaFormat) ⇒ <code>string</code>
        * [.OAuthFlow](#module_@asyncapi/parser+OAuthFlow) ⇐ <code>Base</code>
            * [.authorizationUrl()](#module_@asyncapi/parser+OAuthFlow+authorizationUrl) ⇒ <code>string</code>
            * [.tokenUrl()](#module_@asyncapi/parser+OAuthFlow+tokenUrl) ⇒ <code>string</code>
            * [.refreshUrl()](#module_@asyncapi/parser+OAuthFlow+refreshUrl) ⇒ <code>string</code>
            * [.scopes()](#module_@asyncapi/parser+OAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code>
            * [.hasExtensions()](#module_@asyncapi/parser+OAuthFlow+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+OAuthFlow+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+OAuthFlow+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+OAuthFlow+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+OAuthFlow+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+OAuthFlow+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+OAuthFlow+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+OAuthFlow+ext) ⇒ <code>any</code>
        * [.OperationSecurityRequirement](#module_@asyncapi/parser+OperationSecurityRequirement) ⇐ <code>Base</code>
        * [.OperationTrait](#module_@asyncapi/parser+OperationTrait) ⇐ <code>OperationTraitable</code>
        * [.OperationTraitable](#module_@asyncapi/parser+OperationTraitable) ⇐ <code>Base</code>
            * [.id()](#module_@asyncapi/parser+OperationTraitable+id) ⇒ <code>string</code>
            * [.summary()](#module_@asyncapi/parser+OperationTraitable+summary) ⇒ <code>string</code>
            * [.hasDescription()](#module_@asyncapi/parser+OperationTraitable+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+OperationTraitable+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasTags()](#module_@asyncapi/parser+OperationTraitable+hasTags) ⇒ <code>boolean</code>
            * [.tags()](#module_@asyncapi/parser+OperationTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
            * [.tagNames()](#module_@asyncapi/parser+OperationTraitable+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasTag(name)](#module_@asyncapi/parser+OperationTraitable+hasTag) ⇒ <code>boolean</code>
            * [.tag(name)](#module_@asyncapi/parser+OperationTraitable+tag) ⇒ <code>Tag</code> \| <code>null</code>
            * [.hasExternalDocs()](#module_@asyncapi/parser+OperationTraitable+hasExternalDocs) ⇒ <code>boolean</code>
            * [.externalDocs()](#module_@asyncapi/parser+OperationTraitable+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
            * [.hasBindings()](#module_@asyncapi/parser+OperationTraitable+hasBindings) ⇒ <code>boolean</code>
            * [.bindings()](#module_@asyncapi/parser+OperationTraitable+bindings) ⇒ <code>Object</code>
            * [.bindingProtocols()](#module_@asyncapi/parser+OperationTraitable+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasBinding(name)](#module_@asyncapi/parser+OperationTraitable+hasBinding) ⇒ <code>boolean</code>
            * [.binding(name)](#module_@asyncapi/parser+OperationTraitable+binding) ⇒ <code>Object</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+OperationTraitable+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+OperationTraitable+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+OperationTraitable+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+OperationTraitable+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+OperationTraitable+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+OperationTraitable+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+OperationTraitable+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+OperationTraitable+ext) ⇒ <code>any</code>
        * [.Operation](#module_@asyncapi/parser+Operation) ⇐ <code>OperationTraitable</code>
            * [.hasMultipleMessages()](#module_@asyncapi/parser+Operation+hasMultipleMessages) ⇒ <code>boolean</code>
            * [.traits()](#module_@asyncapi/parser+Operation+traits) ⇒ <code>Array.&lt;OperationTrait&gt;</code>
            * [.hasTraits()](#module_@asyncapi/parser+Operation+hasTraits) ⇒ <code>boolean</code>
            * [.messages()](#module_@asyncapi/parser+Operation+messages) ⇒ <code>Array.&lt;Message&gt;</code>
            * [.message()](#module_@asyncapi/parser+Operation+message) ⇒ <code>Message</code>
            * [.security()](#module_@asyncapi/parser+Operation+security) ⇒ <code>Array.&lt;OperationSecurityRequirement&gt;</code>
        * [.PublishOperation](#module_@asyncapi/parser+PublishOperation) ⇐ <code>Operation</code>
            * [.isPublish()](#module_@asyncapi/parser+PublishOperation+isPublish) ⇒ <code>boolean</code>
            * [.isSubscribe()](#module_@asyncapi/parser+PublishOperation+isSubscribe) ⇒ <code>boolean</code>
            * [.kind()](#module_@asyncapi/parser+PublishOperation+kind) ⇒ <code>string</code>
        * [.Schema](#module_@asyncapi/parser+Schema) ⇐ <code>Base</code>
            * [new Schema(json, [options])](#new_module_@asyncapi/parser+Schema_new)
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
            * [.property(name)](#module_@asyncapi/parser+Schema+property) ⇒ <code>Schema</code>
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
            * [.title()](#module_@asyncapi/parser+Schema+title) ⇒ <code>string</code>
            * [.default()](#module_@asyncapi/parser+Schema+default) ⇒ <code>any</code>
            * [.deprecated()](#module_@asyncapi/parser+Schema+deprecated) ⇒ <code>boolean</code>
            * [.discriminator()](#module_@asyncapi/parser+Schema+discriminator) ⇒ <code>string</code>
            * [.readOnly()](#module_@asyncapi/parser+Schema+readOnly) ⇒ <code>boolean</code>
            * [.writeOnly()](#module_@asyncapi/parser+Schema+writeOnly) ⇒ <code>boolean</code>
            * [.examples()](#module_@asyncapi/parser+Schema+examples) ⇒ <code>Array.&lt;any&gt;</code>
            * [.isBooleanSchema()](#module_@asyncapi/parser+Schema+isBooleanSchema) ⇒ <code>boolean</code>
            * [.isCircular()](#module_@asyncapi/parser+Schema+isCircular) ⇒ <code>boolean</code>
            * [.circularSchema()](#module_@asyncapi/parser+Schema+circularSchema) ⇒ <code>Schema</code>
            * ~~[.hasCircularProps()](#module_@asyncapi/parser+Schema+hasCircularProps) ⇒ <code>boolean</code>~~
            * ~~[.circularProps()](#module_@asyncapi/parser+Schema+circularProps) ⇒ <code>Array.&lt;string&gt;</code>~~
            * [.hasDescription()](#module_@asyncapi/parser+Schema+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+Schema+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExternalDocs()](#module_@asyncapi/parser+Schema+hasExternalDocs) ⇒ <code>boolean</code>
            * [.externalDocs()](#module_@asyncapi/parser+Schema+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Schema+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Schema+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Schema+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Schema+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Schema+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Schema+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Schema+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Schema+ext) ⇒ <code>any</code>
            * [.hasDescription()](#module_@asyncapi/parser+Schema+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+Schema+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExternalDocs()](#module_@asyncapi/parser+Schema+hasExternalDocs) ⇒ <code>boolean</code>
            * [.externalDocs()](#module_@asyncapi/parser+Schema+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Schema+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Schema+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Schema+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Schema+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Schema+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Schema+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Schema+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Schema+ext) ⇒ <code>any</code>
        * [.SecurityScheme](#module_@asyncapi/parser+SecurityScheme) ⇐ <code>Base</code>
            * [.type()](#module_@asyncapi/parser+SecurityScheme+type) ⇒ <code>string</code>
            * [.name()](#module_@asyncapi/parser+SecurityScheme+name) ⇒ <code>string</code>
            * [.in()](#module_@asyncapi/parser+SecurityScheme+in) ⇒ <code>string</code>
            * [.scheme()](#module_@asyncapi/parser+SecurityScheme+scheme) ⇒ <code>string</code>
            * [.bearerFormat()](#module_@asyncapi/parser+SecurityScheme+bearerFormat) ⇒ <code>string</code>
            * [.openIdConnectUrl()](#module_@asyncapi/parser+SecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
            * [.flows()](#module_@asyncapi/parser+SecurityScheme+flows) ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>
            * [.hasDescription()](#module_@asyncapi/parser+SecurityScheme+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+SecurityScheme+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+SecurityScheme+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+SecurityScheme+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+SecurityScheme+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+SecurityScheme+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+SecurityScheme+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+SecurityScheme+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+SecurityScheme+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+SecurityScheme+ext) ⇒ <code>any</code>
        * [.ServerSecurityRequirement](#module_@asyncapi/parser+ServerSecurityRequirement) ⇐ <code>Base</code>
        * [.ServerVariable](#module_@asyncapi/parser+ServerVariable) ⇐ <code>Base</code>
            * [.allowedValues()](#module_@asyncapi/parser+ServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
            * [.allows(name)](#module_@asyncapi/parser+ServerVariable+allows) ⇒ <code>boolean</code>
            * [.hasAllowedValues()](#module_@asyncapi/parser+ServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
            * [.defaultValue()](#module_@asyncapi/parser+ServerVariable+defaultValue) ⇒ <code>string</code>
            * [.hasDefaultValue()](#module_@asyncapi/parser+ServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
            * [.examples()](#module_@asyncapi/parser+ServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasDescription()](#module_@asyncapi/parser+ServerVariable+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+ServerVariable+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+ServerVariable+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+ServerVariable+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+ServerVariable+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+ServerVariable+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+ServerVariable+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+ServerVariable+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+ServerVariable+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+ServerVariable+ext) ⇒ <code>any</code>
        * [.Server](#module_@asyncapi/parser+Server) ⇐ <code>Base</code>
            * [.url()](#module_@asyncapi/parser+Server+url) ⇒ <code>string</code>
            * [.protocol()](#module_@asyncapi/parser+Server+protocol) ⇒ <code>string</code>
            * [.protocolVersion()](#module_@asyncapi/parser+Server+protocolVersion) ⇒ <code>string</code>
            * [.variables()](#module_@asyncapi/parser+Server+variables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
            * [.variable(name)](#module_@asyncapi/parser+Server+variable) ⇒ <code>ServerVariable</code>
            * [.hasVariables()](#module_@asyncapi/parser+Server+hasVariables) ⇒ <code>boolean</code>
            * [.security()](#module_@asyncapi/parser+Server+security) ⇒ <code>Array.&lt;ServerSecurityRequirement&gt;</code>
            * [.hasDescription()](#module_@asyncapi/parser+Server+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+Server+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasBindings()](#module_@asyncapi/parser+Server+hasBindings) ⇒ <code>boolean</code>
            * [.bindings()](#module_@asyncapi/parser+Server+bindings) ⇒ <code>Object</code>
            * [.bindingProtocols()](#module_@asyncapi/parser+Server+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasBinding(name)](#module_@asyncapi/parser+Server+hasBinding) ⇒ <code>boolean</code>
            * [.binding(name)](#module_@asyncapi/parser+Server+binding) ⇒ <code>Object</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Server+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Server+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Server+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Server+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Server+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Server+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Server+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Server+ext) ⇒ <code>any</code>
            * [.hasTags()](#module_@asyncapi/parser+Server+hasTags) ⇒ <code>boolean</code>
            * [.tags()](#module_@asyncapi/parser+Server+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
            * [.tagNames()](#module_@asyncapi/parser+Server+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasTag(name)](#module_@asyncapi/parser+Server+hasTag) ⇒ <code>boolean</code>
            * [.tag(name)](#module_@asyncapi/parser+Server+tag) ⇒ <code>Tag</code> \| <code>null</code>
        * [.SubscribeOperation](#module_@asyncapi/parser+SubscribeOperation) ⇐ <code>Operation</code>
            * [.isPublish()](#module_@asyncapi/parser+SubscribeOperation+isPublish) ⇒ <code>boolean</code>
            * [.isSubscribe()](#module_@asyncapi/parser+SubscribeOperation+isSubscribe) ⇒ <code>boolean</code>
            * [.kind()](#module_@asyncapi/parser+SubscribeOperation+kind) ⇒ <code>string</code>
        * [.Tag](#module_@asyncapi/parser+Tag) ⇐ <code>Base</code>
            * [.name()](#module_@asyncapi/parser+Tag+name) ⇒ <code>string</code>
            * [.hasDescription()](#module_@asyncapi/parser+Tag+hasDescription) ⇒ <code>boolean</code>
            * [.description()](#module_@asyncapi/parser+Tag+description) ⇒ <code>string</code> \| <code>null</code>
            * [.hasExternalDocs()](#module_@asyncapi/parser+Tag+hasExternalDocs) ⇒ <code>boolean</code>
            * [.externalDocs()](#module_@asyncapi/parser+Tag+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
            * [.hasExtensions()](#module_@asyncapi/parser+Tag+hasExtensions) ⇒ <code>boolean</code>
            * [.extensions()](#module_@asyncapi/parser+Tag+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
            * [.extensionKeys()](#module_@asyncapi/parser+Tag+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.extKeys()](#module_@asyncapi/parser+Tag+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
            * [.hasExtension(key)](#module_@asyncapi/parser+Tag+hasExtension) ⇒ <code>boolean</code>
            * [.extension(key)](#module_@asyncapi/parser+Tag+extension) ⇒ <code>any</code>
            * [.hasExt(key)](#module_@asyncapi/parser+Tag+hasExt) ⇒ <code>boolean</code>
            * [.ext(key)](#module_@asyncapi/parser+Tag+ext) ⇒ <code>any</code>
    * _static_
        * [.TraverseSchemas](#module_@asyncapi/parser.TraverseSchemas) ⇒ <code>boolean</code>
    * _inner_
        * [~parse(asyncapiYAMLorJSON, [options])](#module_@asyncapi/parser..parse) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
        * [~parseFromUrl(url, [fetchOptions], [options])](#module_@asyncapi/parser..parseFromUrl) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
        * [~registerSchemaParser(parserModule)](#module_@asyncapi/parser..registerSchemaParser)
        * [~ParserOptions](#module_@asyncapi/parser..ParserOptions) : <code>Object</code>

<a name="module_@asyncapi/parser+ParserError"></a>

### @asyncapi/parser.ParserError ⇐ <code>Error</code>
Represents an error while trying to parse an AsyncAPI document.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Error</code>  

* [.ParserError](#module_@asyncapi/parser+ParserError) ⇐ <code>Error</code>
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

### @asyncapi/parser.AsyncAPIDocument ⇐ <code>Base</code>
Implements functions to deal with the AsyncAPI document.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinTags</code>](#MixinTags), [<code>MixinExternalDocs</code>](#MixinExternalDocs), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.AsyncAPIDocument](#module_@asyncapi/parser+AsyncAPIDocument) ⇐ <code>Base</code>
    * _instance_
        * [.version()](#module_@asyncapi/parser+AsyncAPIDocument+version) ⇒ <code>string</code>
        * [.info()](#module_@asyncapi/parser+AsyncAPIDocument+info) ⇒ <code>Info</code>
        * [.id()](#module_@asyncapi/parser+AsyncAPIDocument+id) ⇒ <code>string</code>
        * [.hasServers()](#module_@asyncapi/parser+AsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
        * [.servers()](#module_@asyncapi/parser+AsyncAPIDocument+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
        * [.serverNames()](#module_@asyncapi/parser+AsyncAPIDocument+serverNames) ⇒ <code>Array.&lt;string&gt;</code>
        * [.server(name)](#module_@asyncapi/parser+AsyncAPIDocument+server) ⇒ <code>Server</code>
        * [.hasDefaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+hasDefaultContentType) ⇒ <code>boolean</code>
        * [.defaultContentType()](#module_@asyncapi/parser+AsyncAPIDocument+defaultContentType) ⇒ <code>string</code> \| <code>null</code>
        * [.hasChannels()](#module_@asyncapi/parser+AsyncAPIDocument+hasChannels) ⇒ <code>boolean</code>
        * [.channels()](#module_@asyncapi/parser+AsyncAPIDocument+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
        * [.channelNames()](#module_@asyncapi/parser+AsyncAPIDocument+channelNames) ⇒ <code>Array.&lt;string&gt;</code>
        * [.channel(name)](#module_@asyncapi/parser+AsyncAPIDocument+channel) ⇒ <code>Channel</code>
        * [.hasComponents()](#module_@asyncapi/parser+AsyncAPIDocument+hasComponents) ⇒ <code>boolean</code>
        * [.components()](#module_@asyncapi/parser+AsyncAPIDocument+components) ⇒ <code>Components</code>
        * [.hasMessages()](#module_@asyncapi/parser+AsyncAPIDocument+hasMessages) ⇒ <code>boolean</code>
        * [.allMessages()](#module_@asyncapi/parser+AsyncAPIDocument+allMessages) ⇒ <code>Map.&lt;string, Message&gt;</code>
        * [.allSchemas()](#module_@asyncapi/parser+AsyncAPIDocument+allSchemas) ⇒ <code>Map.&lt;string, Schema&gt;</code>
        * [.hasCircular()](#module_@asyncapi/parser+AsyncAPIDocument+hasCircular) ⇒ <code>boolean</code>
        * [.traverseSchemas(callback, schemaTypesToIterate)](#module_@asyncapi/parser+AsyncAPIDocument+traverseSchemas)
        * [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
        * [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
        * [.tagNames()](#module_@asyncapi/parser+AsyncAPIDocument+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
        * [.hasTag(name)](#module_@asyncapi/parser+AsyncAPIDocument+hasTag) ⇒ <code>boolean</code>
        * [.tag(name)](#module_@asyncapi/parser+AsyncAPIDocument+tag) ⇒ <code>Tag</code> \| <code>null</code>
        * [.hasExternalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs) ⇒ <code>boolean</code>
        * [.externalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
        * [.hasExtensions()](#module_@asyncapi/parser+AsyncAPIDocument+hasExtensions) ⇒ <code>boolean</code>
        * [.extensions()](#module_@asyncapi/parser+AsyncAPIDocument+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
        * [.extensionKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
        * [.extKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
        * [.hasExtension(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExtension) ⇒ <code>boolean</code>
        * [.extension(key)](#module_@asyncapi/parser+AsyncAPIDocument+extension) ⇒ <code>any</code>
        * [.hasExt(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExt) ⇒ <code>boolean</code>
        * [.ext(key)](#module_@asyncapi/parser+AsyncAPIDocument+ext) ⇒ <code>any</code>
        * [.hasTags()](#module_@asyncapi/parser+AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
        * [.tags()](#module_@asyncapi/parser+AsyncAPIDocument+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
        * [.tagNames()](#module_@asyncapi/parser+AsyncAPIDocument+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
        * [.hasTag(name)](#module_@asyncapi/parser+AsyncAPIDocument+hasTag) ⇒ <code>boolean</code>
        * [.tag(name)](#module_@asyncapi/parser+AsyncAPIDocument+tag) ⇒ <code>Tag</code> \| <code>null</code>
        * [.hasExternalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs) ⇒ <code>boolean</code>
        * [.externalDocs()](#module_@asyncapi/parser+AsyncAPIDocument+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
        * [.hasExtensions()](#module_@asyncapi/parser+AsyncAPIDocument+hasExtensions) ⇒ <code>boolean</code>
        * [.extensions()](#module_@asyncapi/parser+AsyncAPIDocument+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
        * [.extensionKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
        * [.extKeys()](#module_@asyncapi/parser+AsyncAPIDocument+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
        * [.hasExtension(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExtension) ⇒ <code>boolean</code>
        * [.extension(key)](#module_@asyncapi/parser+AsyncAPIDocument+extension) ⇒ <code>any</code>
        * [.hasExt(key)](#module_@asyncapi/parser+AsyncAPIDocument+hasExt) ⇒ <code>boolean</code>
        * [.ext(key)](#module_@asyncapi/parser+AsyncAPIDocument+ext) ⇒ <code>any</code>
    * _static_
        * [.stringify(doc, [space])](#module_@asyncapi/parser+AsyncAPIDocument.stringify) ⇒ <code>string</code>
        * [.parse(doc)](#module_@asyncapi/parser+AsyncAPIDocument.parse) ⇒ <code>AsyncAPIDocument</code>

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
<a name="module_@asyncapi/parser+AsyncAPIDocument+serverNames"></a>

#### asyncAPIDocument.serverNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+server"></a>

#### asyncAPIDocument.server(name) ⇒ <code>Server</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasDefaultContentType"></a>

#### asyncAPIDocument.hasDefaultContentType() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+defaultContentType"></a>

#### asyncAPIDocument.defaultContentType() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
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

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasComponents"></a>

#### asyncAPIDocument.hasComponents() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+components"></a>

#### asyncAPIDocument.components() ⇒ <code>Components</code>
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
<a name="module_@asyncapi/parser+AsyncAPIDocument+traverseSchemas"></a>

#### asyncAPIDocument.traverseSchemas(callback, schemaTypesToIterate)
Traverse schemas in the document and select which types of schemas to include.
By default all schemas are iterated

**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  

| Param | Type |
| --- | --- |
| callback | <code>TraverseSchemas</code> | 
| schemaTypesToIterate | [<code>Array.&lt;SchemaTypesToIterate&gt;</code>](#SchemaTypesToIterate) | 

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasTags"></a>

#### asyncAPIDocument.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasTags</code>](#MixinTags.hasTags)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+tags"></a>

#### asyncAPIDocument.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>tags</code>](#MixinTags.tags)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+tagNames"></a>

#### asyncAPIDocument.tagNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>tagNames</code>](#MixinTags.tagNames)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasTag"></a>

#### asyncAPIDocument.hasTag(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasTag</code>](#MixinTags.hasTag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+tag"></a>

#### asyncAPIDocument.tag(name) ⇒ <code>Tag</code> \| <code>null</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>tag</code>](#MixinTags.tag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs"></a>

#### asyncAPIDocument.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+externalDocs"></a>

#### asyncAPIDocument.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExtensions"></a>

#### asyncAPIDocument.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+extensions"></a>

#### asyncAPIDocument.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+extensionKeys"></a>

#### asyncAPIDocument.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+extKeys"></a>

#### asyncAPIDocument.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExtension"></a>

#### asyncAPIDocument.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+extension"></a>

#### asyncAPIDocument.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExt"></a>

#### asyncAPIDocument.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+ext"></a>

#### asyncAPIDocument.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasTags"></a>

#### asyncAPIDocument.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasTags</code>](#MixinTags.hasTags)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+tags"></a>

#### asyncAPIDocument.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>tags</code>](#MixinTags.tags)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+tagNames"></a>

#### asyncAPIDocument.tagNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>tagNames</code>](#MixinTags.tagNames)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasTag"></a>

#### asyncAPIDocument.hasTag(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasTag</code>](#MixinTags.hasTag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+tag"></a>

#### asyncAPIDocument.tag(name) ⇒ <code>Tag</code> \| <code>null</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>tag</code>](#MixinTags.tag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExternalDocs"></a>

#### asyncAPIDocument.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+externalDocs"></a>

#### asyncAPIDocument.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExtensions"></a>

#### asyncAPIDocument.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+extensions"></a>

#### asyncAPIDocument.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+extensionKeys"></a>

#### asyncAPIDocument.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+extKeys"></a>

#### asyncAPIDocument.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExtension"></a>

#### asyncAPIDocument.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+extension"></a>

#### asyncAPIDocument.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+hasExt"></a>

#### asyncAPIDocument.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument+ext"></a>

#### asyncAPIDocument.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+AsyncAPIDocument.stringify"></a>

#### AsyncAPIDocument.stringify(doc, [space]) ⇒ <code>string</code>
Converts a valid AsyncAPI document to a JavaScript Object Notation (JSON) string.
A stringified AsyncAPI document using this function should be parsed via the AsyncAPIDocument.parse() function - the JSON.parse() function is not compatible.

**Kind**: static method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>AsyncAPIDocument</code> | A valid AsyncAPIDocument instance. |
| [space] | <code>number</code> \| <code>string</code> | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read. |

<a name="module_@asyncapi/parser+AsyncAPIDocument.parse"></a>

#### AsyncAPIDocument.parse(doc) ⇒ <code>AsyncAPIDocument</code>
Converts a valid stringified AsyncAPIDocument instance into an AsyncAPIDocument instance.

**Kind**: static method of [<code>AsyncAPIDocument</code>](#module_@asyncapi/parser+AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>string</code> | A valid stringified AsyncAPIDocument instance. |

<a name="module_@asyncapi/parser+Base"></a>

### @asyncapi/parser.Base
Implements common functionality for all the models.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
<a name="module_@asyncapi/parser+Base+json"></a>

#### base.json([key]) ⇒ <code>any</code>
**Kind**: instance method of [<code>Base</code>](#module_@asyncapi/parser+Base)  

| Param | Type | Description |
| --- | --- | --- |
| [key] | <code>string</code> | A key to retrieve from the JSON object. |

<a name="module_@asyncapi/parser+ChannelParameter"></a>

### @asyncapi/parser.ChannelParameter ⇐ <code>Base</code>
Implements functions to deal with a ChannelParameter object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.ChannelParameter](#module_@asyncapi/parser+ChannelParameter) ⇐ <code>Base</code>
    * [.location()](#module_@asyncapi/parser+ChannelParameter+location) ⇒ <code>string</code>
    * [.schema()](#module_@asyncapi/parser+ChannelParameter+schema) ⇒ <code>Schema</code>
    * [.hasDescription()](#module_@asyncapi/parser+ChannelParameter+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+ChannelParameter+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+ChannelParameter+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+ChannelParameter+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+ChannelParameter+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+ChannelParameter+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+ChannelParameter+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+ChannelParameter+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+ChannelParameter+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+ChannelParameter+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+ChannelParameter+location"></a>

#### channelParameter.location() ⇒ <code>string</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
<a name="module_@asyncapi/parser+ChannelParameter+schema"></a>

#### channelParameter.schema() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
<a name="module_@asyncapi/parser+ChannelParameter+hasDescription"></a>

#### channelParameter.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+ChannelParameter+description"></a>

#### channelParameter.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+ChannelParameter+hasExtensions"></a>

#### channelParameter.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+ChannelParameter+extensions"></a>

#### channelParameter.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+ChannelParameter+extensionKeys"></a>

#### channelParameter.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+ChannelParameter+extKeys"></a>

#### channelParameter.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+ChannelParameter+hasExtension"></a>

#### channelParameter.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ChannelParameter+extension"></a>

#### channelParameter.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ChannelParameter+hasExt"></a>

#### channelParameter.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ChannelParameter+ext"></a>

#### channelParameter.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#module_@asyncapi/parser+ChannelParameter)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Channel"></a>

### @asyncapi/parser.Channel ⇐ <code>Base</code>
Implements functions to deal with a Channel object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinBindings</code>](#MixinBindings), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.Channel](#module_@asyncapi/parser+Channel) ⇐ <code>Base</code>
    * [.parameters()](#module_@asyncapi/parser+Channel+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
    * [.parameter(name)](#module_@asyncapi/parser+Channel+parameter) ⇒ <code>ChannelParameter</code>
    * [.hasParameters()](#module_@asyncapi/parser+Channel+hasParameters) ⇒ <code>boolean</code>
    * [.hasServers()](#module_@asyncapi/parser+Channel+hasServers) ⇒ <code>boolean</code>
    * [.servers()](#module_@asyncapi/parser+Channel+servers) ⇒ <code>Array.&lt;String&gt;</code>
    * [.server(index)](#module_@asyncapi/parser+Channel+server) ⇒ <code>String</code>
    * [.publish()](#module_@asyncapi/parser+Channel+publish) ⇒ <code>PublishOperation</code>
    * [.subscribe()](#module_@asyncapi/parser+Channel+subscribe) ⇒ <code>SubscribeOperation</code>
    * [.hasPublish()](#module_@asyncapi/parser+Channel+hasPublish) ⇒ <code>boolean</code>
    * [.hasSubscribe()](#module_@asyncapi/parser+Channel+hasSubscribe) ⇒ <code>boolean</code>
    * [.hasDescription()](#module_@asyncapi/parser+Channel+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+Channel+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasBindings()](#module_@asyncapi/parser+Channel+hasBindings) ⇒ <code>boolean</code>
    * [.bindings()](#module_@asyncapi/parser+Channel+bindings) ⇒ <code>Object</code>
    * [.bindingProtocols()](#module_@asyncapi/parser+Channel+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasBinding(name)](#module_@asyncapi/parser+Channel+hasBinding) ⇒ <code>boolean</code>
    * [.binding(name)](#module_@asyncapi/parser+Channel+binding) ⇒ <code>Object</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Channel+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Channel+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Channel+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Channel+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Channel+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Channel+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Channel+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Channel+ext) ⇒ <code>any</code>

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
<a name="module_@asyncapi/parser+Channel+hasServers"></a>

#### channel.hasServers() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+servers"></a>

#### channel.servers() ⇒ <code>Array.&lt;String&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
<a name="module_@asyncapi/parser+Channel+server"></a>

#### channel.server(index) ⇒ <code>String</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of the server. |

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
<a name="module_@asyncapi/parser+Channel+hasDescription"></a>

#### channel.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+Channel+description"></a>

#### channel.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+Channel+hasBindings"></a>

#### channel.hasBindings() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>hasBindings</code>](#MixinBindings.hasBindings)  
<a name="module_@asyncapi/parser+Channel+bindings"></a>

#### channel.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>bindings</code>](#MixinBindings.bindings)  
<a name="module_@asyncapi/parser+Channel+bindingProtocols"></a>

#### channel.bindingProtocols() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>bindingProtocols</code>](#MixinBindings.bindingProtocols)  
<a name="module_@asyncapi/parser+Channel+hasBinding"></a>

#### channel.hasBinding(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>hasBinding</code>](#MixinBindings.hasBinding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+Channel+binding"></a>

#### channel.binding(name) ⇒ <code>Object</code> \| <code>null</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>binding</code>](#MixinBindings.binding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+Channel+hasExtensions"></a>

#### channel.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Channel+extensions"></a>

#### channel.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Channel+extensionKeys"></a>

#### channel.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Channel+extKeys"></a>

#### channel.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Channel+hasExtension"></a>

#### channel.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Channel+extension"></a>

#### channel.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Channel+hasExt"></a>

#### channel.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Channel+ext"></a>

#### channel.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Channel</code>](#module_@asyncapi/parser+Channel)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Components"></a>

### @asyncapi/parser.Components ⇐ <code>Base</code>
Implements functions to deal with a Components object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.Components](#module_@asyncapi/parser+Components) ⇐ <code>Base</code>
    * [.channels()](#module_@asyncapi/parser+Components+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
    * [.hasChannels()](#module_@asyncapi/parser+Components+hasChannels) ⇒ <code>boolean</code>
    * [.channel(name)](#module_@asyncapi/parser+Components+channel) ⇒ <code>Channel</code>
    * [.messages()](#module_@asyncapi/parser+Components+messages) ⇒ <code>Object.&lt;string, Message&gt;</code>
    * [.hasMessages()](#module_@asyncapi/parser+Components+hasMessages) ⇒ <code>boolean</code>
    * [.message(name)](#module_@asyncapi/parser+Components+message) ⇒ <code>Message</code>
    * [.schemas()](#module_@asyncapi/parser+Components+schemas) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.hasSchemas()](#module_@asyncapi/parser+Components+hasSchemas) ⇒ <code>boolean</code>
    * [.schema(name)](#module_@asyncapi/parser+Components+schema) ⇒ <code>Schema</code>
    * [.securitySchemes()](#module_@asyncapi/parser+Components+securitySchemes) ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
    * [.hasSecuritySchemes()](#module_@asyncapi/parser+Components+hasSecuritySchemes) ⇒ <code>boolean</code>
    * [.securityScheme(name)](#module_@asyncapi/parser+Components+securityScheme) ⇒ <code>SecurityScheme</code>
    * [.servers()](#module_@asyncapi/parser+Components+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
    * [.hasServers()](#module_@asyncapi/parser+Components+hasServers) ⇒ <code>boolean</code>
    * [.server(name)](#module_@asyncapi/parser+Components+server) ⇒ <code>Server</code>
    * [.parameters()](#module_@asyncapi/parser+Components+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
    * [.hasParameters()](#module_@asyncapi/parser+Components+hasParameters) ⇒ <code>boolean</code>
    * [.parameter(name)](#module_@asyncapi/parser+Components+parameter) ⇒ <code>ChannelParameter</code>
    * [.correlationIds()](#module_@asyncapi/parser+Components+correlationIds) ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
    * [.hasCorrelationIds()](#module_@asyncapi/parser+Components+hasCorrelationIds) ⇒ <code>boolean</code>
    * [.correlationId(name)](#module_@asyncapi/parser+Components+correlationId) ⇒ <code>CorrelationId</code>
    * [.operationTraits()](#module_@asyncapi/parser+Components+operationTraits) ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
    * [.hasOperationTraits()](#module_@asyncapi/parser+Components+hasOperationTraits) ⇒ <code>boolean</code>
    * [.operationTrait(name)](#module_@asyncapi/parser+Components+operationTrait) ⇒ <code>OperationTrait</code>
    * [.messageTraits()](#module_@asyncapi/parser+Components+messageTraits) ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
    * [.hasMessageTraits()](#module_@asyncapi/parser+Components+hasMessageTraits) ⇒ <code>boolean</code>
    * [.messageTrait(name)](#module_@asyncapi/parser+Components+messageTrait) ⇒ <code>MessageTrait</code>
    * [.serverVariables()](#module_@asyncapi/parser+Components+serverVariables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
    * [.hasServerVariables()](#module_@asyncapi/parser+Components+hasServerVariables) ⇒ <code>boolean</code>
    * [.serverVariable(name)](#module_@asyncapi/parser+Components+serverVariable) ⇒ <code>ServerVariable</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Components+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Components+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Components+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Components+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Components+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Components+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Components+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Components+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+Components+channels"></a>

#### components.channels() ⇒ <code>Object.&lt;string, Channel&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasChannels"></a>

#### components.hasChannels() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+channel"></a>

#### components.channel(name) ⇒ <code>Channel</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the channel. |

<a name="module_@asyncapi/parser+Components+messages"></a>

#### components.messages() ⇒ <code>Object.&lt;string, Message&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasMessages"></a>

#### components.hasMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+message"></a>

#### components.message(name) ⇒ <code>Message</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the message. |

<a name="module_@asyncapi/parser+Components+schemas"></a>

#### components.schemas() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasSchemas"></a>

#### components.hasSchemas() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+schema"></a>

#### components.schema(name) ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the schema. |

<a name="module_@asyncapi/parser+Components+securitySchemes"></a>

#### components.securitySchemes() ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasSecuritySchemes"></a>

#### components.hasSecuritySchemes() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+securityScheme"></a>

#### components.securityScheme(name) ⇒ <code>SecurityScheme</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the security schema. |

<a name="module_@asyncapi/parser+Components+servers"></a>

#### components.servers() ⇒ <code>Object.&lt;string, Server&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasServers"></a>

#### components.hasServers() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+server"></a>

#### components.server(name) ⇒ <code>Server</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server. |

<a name="module_@asyncapi/parser+Components+parameters"></a>

#### components.parameters() ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasParameters"></a>

#### components.hasParameters() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+parameter"></a>

#### components.parameter(name) ⇒ <code>ChannelParameter</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the channel parameter. |

<a name="module_@asyncapi/parser+Components+correlationIds"></a>

#### components.correlationIds() ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasCorrelationIds"></a>

#### components.hasCorrelationIds() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+correlationId"></a>

#### components.correlationId(name) ⇒ <code>CorrelationId</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the correlationId. |

<a name="module_@asyncapi/parser+Components+operationTraits"></a>

#### components.operationTraits() ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasOperationTraits"></a>

#### components.hasOperationTraits() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+operationTrait"></a>

#### components.operationTrait(name) ⇒ <code>OperationTrait</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the operation trait. |

<a name="module_@asyncapi/parser+Components+messageTraits"></a>

#### components.messageTraits() ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasMessageTraits"></a>

#### components.hasMessageTraits() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+messageTrait"></a>

#### components.messageTrait(name) ⇒ <code>MessageTrait</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the message trait. |

<a name="module_@asyncapi/parser+Components+serverVariables"></a>

#### components.serverVariables() ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+hasServerVariables"></a>

#### components.hasServerVariables() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
<a name="module_@asyncapi/parser+Components+serverVariable"></a>

#### components.serverVariable(name) ⇒ <code>ServerVariable</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server variable. |

<a name="module_@asyncapi/parser+Components+hasExtensions"></a>

#### components.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Components+extensions"></a>

#### components.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Components+extensionKeys"></a>

#### components.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Components+extKeys"></a>

#### components.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Components+hasExtension"></a>

#### components.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Components+extension"></a>

#### components.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Components+hasExt"></a>

#### components.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Components+ext"></a>

#### components.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Components</code>](#module_@asyncapi/parser+Components)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Contact"></a>

### @asyncapi/parser.Contact ⇐ <code>Base</code>
Implements functions to deal with the Contact object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.Contact](#module_@asyncapi/parser+Contact) ⇐ <code>Base</code>
    * [.name()](#module_@asyncapi/parser+Contact+name) ⇒ <code>string</code>
    * [.url()](#module_@asyncapi/parser+Contact+url) ⇒ <code>string</code>
    * [.email()](#module_@asyncapi/parser+Contact+email) ⇒ <code>string</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Contact+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Contact+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Contact+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Contact+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Contact+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Contact+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Contact+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Contact+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+Contact+name"></a>

#### contact.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
<a name="module_@asyncapi/parser+Contact+url"></a>

#### contact.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
<a name="module_@asyncapi/parser+Contact+email"></a>

#### contact.email() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
<a name="module_@asyncapi/parser+Contact+hasExtensions"></a>

#### contact.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Contact+extensions"></a>

#### contact.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Contact+extensionKeys"></a>

#### contact.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Contact+extKeys"></a>

#### contact.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Contact+hasExtension"></a>

#### contact.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Contact+extension"></a>

#### contact.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Contact+hasExt"></a>

#### contact.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Contact+ext"></a>

#### contact.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Contact</code>](#module_@asyncapi/parser+Contact)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+CorrelationId"></a>

### @asyncapi/parser.CorrelationId ⇐ <code>Base</code>
Implements functions to deal with a CorrelationId object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.CorrelationId](#module_@asyncapi/parser+CorrelationId) ⇐ <code>Base</code>
    * [.location()](#module_@asyncapi/parser+CorrelationId+location) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+CorrelationId+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+CorrelationId+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+CorrelationId+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+CorrelationId+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+CorrelationId+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+CorrelationId+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+CorrelationId+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+CorrelationId+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+CorrelationId+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+CorrelationId+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+CorrelationId+location"></a>

#### correlationId.location() ⇒ <code>string</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
<a name="module_@asyncapi/parser+CorrelationId+hasDescription"></a>

#### correlationId.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+CorrelationId+description"></a>

#### correlationId.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+CorrelationId+hasExtensions"></a>

#### correlationId.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+CorrelationId+extensions"></a>

#### correlationId.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+CorrelationId+extensionKeys"></a>

#### correlationId.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+CorrelationId+extKeys"></a>

#### correlationId.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+CorrelationId+hasExtension"></a>

#### correlationId.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+CorrelationId+extension"></a>

#### correlationId.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+CorrelationId+hasExt"></a>

#### correlationId.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+CorrelationId+ext"></a>

#### correlationId.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>CorrelationId</code>](#module_@asyncapi/parser+CorrelationId)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ExternalDocs"></a>

### @asyncapi/parser.ExternalDocs ⇐ <code>Base</code>
Implements functions to deal with an ExternalDocs object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.ExternalDocs](#module_@asyncapi/parser+ExternalDocs) ⇐ <code>Base</code>
    * [.url()](#module_@asyncapi/parser+ExternalDocs+url) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+ExternalDocs+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+ExternalDocs+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+ExternalDocs+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+ExternalDocs+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+ExternalDocs+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+ExternalDocs+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+ExternalDocs+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+ExternalDocs+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+ExternalDocs+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+ExternalDocs+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+ExternalDocs+url"></a>

#### externalDocs.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
<a name="module_@asyncapi/parser+ExternalDocs+hasDescription"></a>

#### externalDocs.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+ExternalDocs+description"></a>

#### externalDocs.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+ExternalDocs+hasExtensions"></a>

#### externalDocs.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+ExternalDocs+extensions"></a>

#### externalDocs.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+ExternalDocs+extensionKeys"></a>

#### externalDocs.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+ExternalDocs+extKeys"></a>

#### externalDocs.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+ExternalDocs+hasExtension"></a>

#### externalDocs.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ExternalDocs+extension"></a>

#### externalDocs.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ExternalDocs+hasExt"></a>

#### externalDocs.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ExternalDocs+ext"></a>

#### externalDocs.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#module_@asyncapi/parser+ExternalDocs)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Info"></a>

### @asyncapi/parser.Info ⇐ <code>Base</code>
Implements functions to deal with the Info object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.Info](#module_@asyncapi/parser+Info) ⇐ <code>Base</code>
    * [.title()](#module_@asyncapi/parser+Info+title) ⇒ <code>string</code>
    * [.version()](#module_@asyncapi/parser+Info+version) ⇒ <code>string</code>
    * [.termsOfService()](#module_@asyncapi/parser+Info+termsOfService) ⇒ <code>string</code> \| <code>undefined</code>
    * [.license()](#module_@asyncapi/parser+Info+license) ⇒ <code>License</code>
    * [.contact()](#module_@asyncapi/parser+Info+contact) ⇒ <code>Contact</code>
    * [.hasDescription()](#module_@asyncapi/parser+Info+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+Info+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Info+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Info+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Info+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Info+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Info+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Info+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Info+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Info+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+Info+title"></a>

#### info.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+version"></a>

#### info.version() ⇒ <code>string</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+termsOfService"></a>

#### info.termsOfService() ⇒ <code>string</code> \| <code>undefined</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+license"></a>

#### info.license() ⇒ <code>License</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+contact"></a>

#### info.contact() ⇒ <code>Contact</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
<a name="module_@asyncapi/parser+Info+hasDescription"></a>

#### info.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+Info+description"></a>

#### info.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+Info+hasExtensions"></a>

#### info.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Info+extensions"></a>

#### info.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Info+extensionKeys"></a>

#### info.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Info+extKeys"></a>

#### info.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Info+hasExtension"></a>

#### info.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Info+extension"></a>

#### info.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Info+hasExt"></a>

#### info.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Info+ext"></a>

#### info.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Info</code>](#module_@asyncapi/parser+Info)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+License"></a>

### @asyncapi/parser.License ⇐ <code>Base</code>
Implements functions to deal with the License object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.License](#module_@asyncapi/parser+License) ⇐ <code>Base</code>
    * [.name()](#module_@asyncapi/parser+License+name) ⇒ <code>string</code>
    * [.url()](#module_@asyncapi/parser+License+url) ⇒ <code>string</code>
    * [.hasExtensions()](#module_@asyncapi/parser+License+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+License+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+License+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+License+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+License+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+License+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+License+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+License+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+License+name"></a>

#### license.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
<a name="module_@asyncapi/parser+License+url"></a>

#### license.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
<a name="module_@asyncapi/parser+License+hasExtensions"></a>

#### license.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+License+extensions"></a>

#### license.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+License+extensionKeys"></a>

#### license.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+License+extKeys"></a>

#### license.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+License+hasExtension"></a>

#### license.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+License+extension"></a>

#### license.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+License+hasExt"></a>

#### license.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+License+ext"></a>

#### license.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>License</code>](#module_@asyncapi/parser+License)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+MessageTrait"></a>

### @asyncapi/parser.MessageTrait ⇐ <code>MessageTraitable</code>
Implements functions to deal with a MessageTrait object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>MessageTraitable</code>  
<a name="module_@asyncapi/parser+MessageTraitable"></a>

### @asyncapi/parser.MessageTraitable ⇐ <code>Base</code>
Implements functions to deal with a the common properties that Message and MessageTrait objects have.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinTags</code>](#MixinTags), [<code>MixinExternalDocs</code>](#MixinExternalDocs), [<code>MixinBindings</code>](#MixinBindings), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.MessageTraitable](#module_@asyncapi/parser+MessageTraitable) ⇐ <code>Base</code>
    * [.headers()](#module_@asyncapi/parser+MessageTraitable+headers) ⇒ <code>Schema</code>
    * [.header(name)](#module_@asyncapi/parser+MessageTraitable+header) ⇒ <code>Schema</code>
    * [.id()](#module_@asyncapi/parser+MessageTraitable+id) ⇒ <code>string</code>
    * [.correlationId()](#module_@asyncapi/parser+MessageTraitable+correlationId) ⇒ <code>CorrelationId</code>
    * [.schemaFormat()](#module_@asyncapi/parser+MessageTraitable+schemaFormat) ⇒ <code>string</code>
    * [.contentType()](#module_@asyncapi/parser+MessageTraitable+contentType) ⇒ <code>string</code>
    * [.name()](#module_@asyncapi/parser+MessageTraitable+name) ⇒ <code>string</code>
    * [.title()](#module_@asyncapi/parser+MessageTraitable+title) ⇒ <code>string</code>
    * [.summary()](#module_@asyncapi/parser+MessageTraitable+summary) ⇒ <code>string</code>
    * [.examples()](#module_@asyncapi/parser+MessageTraitable+examples) ⇒ <code>Array.&lt;any&gt;</code>
    * [.hasDescription()](#module_@asyncapi/parser+MessageTraitable+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+MessageTraitable+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasTags()](#module_@asyncapi/parser+MessageTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+MessageTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.tagNames()](#module_@asyncapi/parser+MessageTraitable+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasTag(name)](#module_@asyncapi/parser+MessageTraitable+hasTag) ⇒ <code>boolean</code>
    * [.tag(name)](#module_@asyncapi/parser+MessageTraitable+tag) ⇒ <code>Tag</code> \| <code>null</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+MessageTraitable+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+MessageTraitable+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
    * [.hasBindings()](#module_@asyncapi/parser+MessageTraitable+hasBindings) ⇒ <code>boolean</code>
    * [.bindings()](#module_@asyncapi/parser+MessageTraitable+bindings) ⇒ <code>Object</code>
    * [.bindingProtocols()](#module_@asyncapi/parser+MessageTraitable+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasBinding(name)](#module_@asyncapi/parser+MessageTraitable+hasBinding) ⇒ <code>boolean</code>
    * [.binding(name)](#module_@asyncapi/parser+MessageTraitable+binding) ⇒ <code>Object</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+MessageTraitable+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+MessageTraitable+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+MessageTraitable+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+MessageTraitable+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+MessageTraitable+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+MessageTraitable+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+MessageTraitable+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+MessageTraitable+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+MessageTraitable+headers"></a>

#### messageTraitable.headers() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+header"></a>

#### messageTraitable.header(name) ⇒ <code>Schema</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the header. |

<a name="module_@asyncapi/parser+MessageTraitable+id"></a>

#### messageTraitable.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
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
<a name="module_@asyncapi/parser+MessageTraitable+examples"></a>

#### messageTraitable.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
<a name="module_@asyncapi/parser+MessageTraitable+hasDescription"></a>

#### messageTraitable.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+MessageTraitable+description"></a>

#### messageTraitable.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+MessageTraitable+hasTags"></a>

#### messageTraitable.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasTags</code>](#MixinTags.hasTags)  
<a name="module_@asyncapi/parser+MessageTraitable+tags"></a>

#### messageTraitable.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>tags</code>](#MixinTags.tags)  
<a name="module_@asyncapi/parser+MessageTraitable+tagNames"></a>

#### messageTraitable.tagNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>tagNames</code>](#MixinTags.tagNames)  
<a name="module_@asyncapi/parser+MessageTraitable+hasTag"></a>

#### messageTraitable.hasTag(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasTag</code>](#MixinTags.hasTag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+MessageTraitable+tag"></a>

#### messageTraitable.tag(name) ⇒ <code>Tag</code> \| <code>null</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>tag</code>](#MixinTags.tag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+MessageTraitable+hasExternalDocs"></a>

#### messageTraitable.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+MessageTraitable+externalDocs"></a>

#### messageTraitable.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+MessageTraitable+hasBindings"></a>

#### messageTraitable.hasBindings() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasBindings</code>](#MixinBindings.hasBindings)  
<a name="module_@asyncapi/parser+MessageTraitable+bindings"></a>

#### messageTraitable.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>bindings</code>](#MixinBindings.bindings)  
<a name="module_@asyncapi/parser+MessageTraitable+bindingProtocols"></a>

#### messageTraitable.bindingProtocols() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>bindingProtocols</code>](#MixinBindings.bindingProtocols)  
<a name="module_@asyncapi/parser+MessageTraitable+hasBinding"></a>

#### messageTraitable.hasBinding(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasBinding</code>](#MixinBindings.hasBinding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+MessageTraitable+binding"></a>

#### messageTraitable.binding(name) ⇒ <code>Object</code> \| <code>null</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>binding</code>](#MixinBindings.binding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+MessageTraitable+hasExtensions"></a>

#### messageTraitable.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+MessageTraitable+extensions"></a>

#### messageTraitable.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+MessageTraitable+extensionKeys"></a>

#### messageTraitable.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+MessageTraitable+extKeys"></a>

#### messageTraitable.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+MessageTraitable+hasExtension"></a>

#### messageTraitable.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+MessageTraitable+extension"></a>

#### messageTraitable.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+MessageTraitable+hasExt"></a>

#### messageTraitable.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+MessageTraitable+ext"></a>

#### messageTraitable.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#module_@asyncapi/parser+MessageTraitable)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Message"></a>

### @asyncapi/parser.Message ⇐ <code>MessageTraitable</code>
Implements functions to deal with a Message object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>MessageTraitable</code>  

* [.Message](#module_@asyncapi/parser+Message) ⇐ <code>MessageTraitable</code>
    * [.uid()](#module_@asyncapi/parser+Message+uid) ⇒ <code>string</code>
    * [.payload()](#module_@asyncapi/parser+Message+payload) ⇒ <code>Schema</code>
    * [.traits()](#module_@asyncapi/parser+Message+traits) ⇒ <code>Array.&lt;MessageTrait&gt;</code>
    * [.hasTraits()](#module_@asyncapi/parser+Message+hasTraits) ⇒ <code>boolean</code>
    * [.originalPayload()](#module_@asyncapi/parser+Message+originalPayload) ⇒ <code>any</code>
    * [.originalSchemaFormat()](#module_@asyncapi/parser+Message+originalSchemaFormat) ⇒ <code>string</code>

<a name="module_@asyncapi/parser+Message+uid"></a>

#### message.uid() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+Message+payload"></a>

#### message.payload() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+Message+traits"></a>

#### message.traits() ⇒ <code>Array.&lt;MessageTrait&gt;</code>
**Kind**: instance method of [<code>Message</code>](#module_@asyncapi/parser+Message)  
<a name="module_@asyncapi/parser+Message+hasTraits"></a>

#### message.hasTraits() ⇒ <code>boolean</code>
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
**Mixes**: [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.OAuthFlow](#module_@asyncapi/parser+OAuthFlow) ⇐ <code>Base</code>
    * [.authorizationUrl()](#module_@asyncapi/parser+OAuthFlow+authorizationUrl) ⇒ <code>string</code>
    * [.tokenUrl()](#module_@asyncapi/parser+OAuthFlow+tokenUrl) ⇒ <code>string</code>
    * [.refreshUrl()](#module_@asyncapi/parser+OAuthFlow+refreshUrl) ⇒ <code>string</code>
    * [.scopes()](#module_@asyncapi/parser+OAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.hasExtensions()](#module_@asyncapi/parser+OAuthFlow+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+OAuthFlow+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+OAuthFlow+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+OAuthFlow+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+OAuthFlow+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+OAuthFlow+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+OAuthFlow+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+OAuthFlow+ext) ⇒ <code>any</code>

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
<a name="module_@asyncapi/parser+OAuthFlow+hasExtensions"></a>

#### oAuthFlow.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+OAuthFlow+extensions"></a>

#### oAuthFlow.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+OAuthFlow+extensionKeys"></a>

#### oAuthFlow.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+OAuthFlow+extKeys"></a>

#### oAuthFlow.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+OAuthFlow+hasExtension"></a>

#### oAuthFlow.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OAuthFlow+extension"></a>

#### oAuthFlow.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OAuthFlow+hasExt"></a>

#### oAuthFlow.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OAuthFlow+ext"></a>

#### oAuthFlow.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#module_@asyncapi/parser+OAuthFlow)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OperationSecurityRequirement"></a>

### @asyncapi/parser.OperationSecurityRequirement ⇐ <code>Base</code>
Implements functions to deal with a OperationSecurityRequirement object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
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
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinTags</code>](#MixinTags), [<code>MixinExternalDocs</code>](#MixinExternalDocs), [<code>MixinBindings</code>](#MixinBindings), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.OperationTraitable](#module_@asyncapi/parser+OperationTraitable) ⇐ <code>Base</code>
    * [.id()](#module_@asyncapi/parser+OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#module_@asyncapi/parser+OperationTraitable+summary) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+OperationTraitable+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+OperationTraitable+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasTags()](#module_@asyncapi/parser+OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+OperationTraitable+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.tagNames()](#module_@asyncapi/parser+OperationTraitable+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasTag(name)](#module_@asyncapi/parser+OperationTraitable+hasTag) ⇒ <code>boolean</code>
    * [.tag(name)](#module_@asyncapi/parser+OperationTraitable+tag) ⇒ <code>Tag</code> \| <code>null</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+OperationTraitable+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+OperationTraitable+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
    * [.hasBindings()](#module_@asyncapi/parser+OperationTraitable+hasBindings) ⇒ <code>boolean</code>
    * [.bindings()](#module_@asyncapi/parser+OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.bindingProtocols()](#module_@asyncapi/parser+OperationTraitable+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasBinding(name)](#module_@asyncapi/parser+OperationTraitable+hasBinding) ⇒ <code>boolean</code>
    * [.binding(name)](#module_@asyncapi/parser+OperationTraitable+binding) ⇒ <code>Object</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+OperationTraitable+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+OperationTraitable+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+OperationTraitable+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+OperationTraitable+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+OperationTraitable+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+OperationTraitable+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+OperationTraitable+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+OperationTraitable+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+OperationTraitable+id"></a>

#### operationTraitable.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+summary"></a>

#### operationTraitable.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
<a name="module_@asyncapi/parser+OperationTraitable+hasDescription"></a>

#### operationTraitable.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+OperationTraitable+description"></a>

#### operationTraitable.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+OperationTraitable+hasTags"></a>

#### operationTraitable.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasTags</code>](#MixinTags.hasTags)  
<a name="module_@asyncapi/parser+OperationTraitable+tags"></a>

#### operationTraitable.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>tags</code>](#MixinTags.tags)  
<a name="module_@asyncapi/parser+OperationTraitable+tagNames"></a>

#### operationTraitable.tagNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>tagNames</code>](#MixinTags.tagNames)  
<a name="module_@asyncapi/parser+OperationTraitable+hasTag"></a>

#### operationTraitable.hasTag(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasTag</code>](#MixinTags.hasTag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+OperationTraitable+tag"></a>

#### operationTraitable.tag(name) ⇒ <code>Tag</code> \| <code>null</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>tag</code>](#MixinTags.tag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+OperationTraitable+hasExternalDocs"></a>

#### operationTraitable.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+OperationTraitable+externalDocs"></a>

#### operationTraitable.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+OperationTraitable+hasBindings"></a>

#### operationTraitable.hasBindings() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasBindings</code>](#MixinBindings.hasBindings)  
<a name="module_@asyncapi/parser+OperationTraitable+bindings"></a>

#### operationTraitable.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>bindings</code>](#MixinBindings.bindings)  
<a name="module_@asyncapi/parser+OperationTraitable+bindingProtocols"></a>

#### operationTraitable.bindingProtocols() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>bindingProtocols</code>](#MixinBindings.bindingProtocols)  
<a name="module_@asyncapi/parser+OperationTraitable+hasBinding"></a>

#### operationTraitable.hasBinding(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasBinding</code>](#MixinBindings.hasBinding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+OperationTraitable+binding"></a>

#### operationTraitable.binding(name) ⇒ <code>Object</code> \| <code>null</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>binding</code>](#MixinBindings.binding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+OperationTraitable+hasExtensions"></a>

#### operationTraitable.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+OperationTraitable+extensions"></a>

#### operationTraitable.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+OperationTraitable+extensionKeys"></a>

#### operationTraitable.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+OperationTraitable+extKeys"></a>

#### operationTraitable.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+OperationTraitable+hasExtension"></a>

#### operationTraitable.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OperationTraitable+extension"></a>

#### operationTraitable.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OperationTraitable+hasExt"></a>

#### operationTraitable.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+OperationTraitable+ext"></a>

#### operationTraitable.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#module_@asyncapi/parser+OperationTraitable)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Operation"></a>

### @asyncapi/parser.Operation ⇐ <code>OperationTraitable</code>
Implements functions to deal with an Operation object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>OperationTraitable</code>  

* [.Operation](#module_@asyncapi/parser+Operation) ⇐ <code>OperationTraitable</code>
    * [.hasMultipleMessages()](#module_@asyncapi/parser+Operation+hasMultipleMessages) ⇒ <code>boolean</code>
    * [.traits()](#module_@asyncapi/parser+Operation+traits) ⇒ <code>Array.&lt;OperationTrait&gt;</code>
    * [.hasTraits()](#module_@asyncapi/parser+Operation+hasTraits) ⇒ <code>boolean</code>
    * [.messages()](#module_@asyncapi/parser+Operation+messages) ⇒ <code>Array.&lt;Message&gt;</code>
    * [.message()](#module_@asyncapi/parser+Operation+message) ⇒ <code>Message</code>
    * [.security()](#module_@asyncapi/parser+Operation+security) ⇒ <code>Array.&lt;OperationSecurityRequirement&gt;</code>

<a name="module_@asyncapi/parser+Operation+hasMultipleMessages"></a>

#### operation.hasMultipleMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+traits"></a>

#### operation.traits() ⇒ <code>Array.&lt;OperationTrait&gt;</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+hasTraits"></a>

#### operation.hasTraits() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+messages"></a>

#### operation.messages() ⇒ <code>Array.&lt;Message&gt;</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+message"></a>

#### operation.message() ⇒ <code>Message</code>
**Kind**: instance method of [<code>Operation</code>](#module_@asyncapi/parser+Operation)  
<a name="module_@asyncapi/parser+Operation+security"></a>

#### operation.security() ⇒ <code>Array.&lt;OperationSecurityRequirement&gt;</code>
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
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinExternalDocs</code>](#MixinExternalDocs), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.Schema](#module_@asyncapi/parser+Schema) ⇐ <code>Base</code>
    * [new Schema(json, [options])](#new_module_@asyncapi/parser+Schema_new)
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
    * [.property(name)](#module_@asyncapi/parser+Schema+property) ⇒ <code>Schema</code>
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
    * [.title()](#module_@asyncapi/parser+Schema+title) ⇒ <code>string</code>
    * [.default()](#module_@asyncapi/parser+Schema+default) ⇒ <code>any</code>
    * [.deprecated()](#module_@asyncapi/parser+Schema+deprecated) ⇒ <code>boolean</code>
    * [.discriminator()](#module_@asyncapi/parser+Schema+discriminator) ⇒ <code>string</code>
    * [.readOnly()](#module_@asyncapi/parser+Schema+readOnly) ⇒ <code>boolean</code>
    * [.writeOnly()](#module_@asyncapi/parser+Schema+writeOnly) ⇒ <code>boolean</code>
    * [.examples()](#module_@asyncapi/parser+Schema+examples) ⇒ <code>Array.&lt;any&gt;</code>
    * [.isBooleanSchema()](#module_@asyncapi/parser+Schema+isBooleanSchema) ⇒ <code>boolean</code>
    * [.isCircular()](#module_@asyncapi/parser+Schema+isCircular) ⇒ <code>boolean</code>
    * [.circularSchema()](#module_@asyncapi/parser+Schema+circularSchema) ⇒ <code>Schema</code>
    * ~~[.hasCircularProps()](#module_@asyncapi/parser+Schema+hasCircularProps) ⇒ <code>boolean</code>~~
    * ~~[.circularProps()](#module_@asyncapi/parser+Schema+circularProps) ⇒ <code>Array.&lt;string&gt;</code>~~
    * [.hasDescription()](#module_@asyncapi/parser+Schema+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+Schema+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+Schema+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+Schema+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Schema+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Schema+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Schema+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Schema+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Schema+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Schema+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Schema+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Schema+ext) ⇒ <code>any</code>
    * [.hasDescription()](#module_@asyncapi/parser+Schema+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+Schema+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+Schema+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+Schema+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Schema+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Schema+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Schema+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Schema+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Schema+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Schema+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Schema+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Schema+ext) ⇒ <code>any</code>

<a name="new_module_@asyncapi/parser+Schema_new"></a>

#### new Schema(json, [options])
Instantiates a schema object


| Param | Type | Description |
| --- | --- | --- |
| json | <code>any</code> | Schema definition |
| [options] | <code>Object</code> |  |
| [options.parent] | <code>Schema</code> | Parent schema definition |

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
<a name="module_@asyncapi/parser+Schema+property"></a>

#### schema.property(name) ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the property. |

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
<a name="module_@asyncapi/parser+Schema+readOnly"></a>

#### schema.readOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+writeOnly"></a>

#### schema.writeOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+examples"></a>

#### schema.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+isBooleanSchema"></a>

#### schema.isBooleanSchema() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+isCircular"></a>

#### schema.isCircular() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+circularSchema"></a>

#### schema.circularSchema() ⇒ <code>Schema</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+hasCircularProps"></a>

#### ~~schema.hasCircularProps() ⇒ <code>boolean</code>~~
***Deprecated***

**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+circularProps"></a>

#### ~~schema.circularProps() ⇒ <code>Array.&lt;string&gt;</code>~~
***Deprecated***

**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
<a name="module_@asyncapi/parser+Schema+hasDescription"></a>

#### schema.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+Schema+description"></a>

#### schema.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+Schema+hasExternalDocs"></a>

#### schema.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+Schema+externalDocs"></a>

#### schema.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+Schema+hasExtensions"></a>

#### schema.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Schema+extensions"></a>

#### schema.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Schema+extensionKeys"></a>

#### schema.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Schema+extKeys"></a>

#### schema.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Schema+hasExtension"></a>

#### schema.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+extension"></a>

#### schema.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+hasExt"></a>

#### schema.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+ext"></a>

#### schema.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+hasDescription"></a>

#### schema.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+Schema+description"></a>

#### schema.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+Schema+hasExternalDocs"></a>

#### schema.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+Schema+externalDocs"></a>

#### schema.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+Schema+hasExtensions"></a>

#### schema.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Schema+extensions"></a>

#### schema.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Schema+extensionKeys"></a>

#### schema.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Schema+extKeys"></a>

#### schema.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Schema+hasExtension"></a>

#### schema.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+extension"></a>

#### schema.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+hasExt"></a>

#### schema.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Schema+ext"></a>

#### schema.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#module_@asyncapi/parser+Schema)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+SecurityScheme"></a>

### @asyncapi/parser.SecurityScheme ⇐ <code>Base</code>
Implements functions to deal with a SecurityScheme object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.SecurityScheme](#module_@asyncapi/parser+SecurityScheme) ⇐ <code>Base</code>
    * [.type()](#module_@asyncapi/parser+SecurityScheme+type) ⇒ <code>string</code>
    * [.name()](#module_@asyncapi/parser+SecurityScheme+name) ⇒ <code>string</code>
    * [.in()](#module_@asyncapi/parser+SecurityScheme+in) ⇒ <code>string</code>
    * [.scheme()](#module_@asyncapi/parser+SecurityScheme+scheme) ⇒ <code>string</code>
    * [.bearerFormat()](#module_@asyncapi/parser+SecurityScheme+bearerFormat) ⇒ <code>string</code>
    * [.openIdConnectUrl()](#module_@asyncapi/parser+SecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
    * [.flows()](#module_@asyncapi/parser+SecurityScheme+flows) ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>
    * [.hasDescription()](#module_@asyncapi/parser+SecurityScheme+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+SecurityScheme+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+SecurityScheme+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+SecurityScheme+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+SecurityScheme+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+SecurityScheme+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+SecurityScheme+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+SecurityScheme+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+SecurityScheme+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+SecurityScheme+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+SecurityScheme+type"></a>

#### securityScheme.type() ⇒ <code>string</code>
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
<a name="module_@asyncapi/parser+SecurityScheme+hasDescription"></a>

#### securityScheme.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+SecurityScheme+description"></a>

#### securityScheme.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+SecurityScheme+hasExtensions"></a>

#### securityScheme.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+SecurityScheme+extensions"></a>

#### securityScheme.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+SecurityScheme+extensionKeys"></a>

#### securityScheme.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+SecurityScheme+extKeys"></a>

#### securityScheme.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+SecurityScheme+hasExtension"></a>

#### securityScheme.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+SecurityScheme+extension"></a>

#### securityScheme.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+SecurityScheme+hasExt"></a>

#### securityScheme.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+SecurityScheme+ext"></a>

#### securityScheme.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#module_@asyncapi/parser+SecurityScheme)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

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
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.ServerVariable](#module_@asyncapi/parser+ServerVariable) ⇐ <code>Base</code>
    * [.allowedValues()](#module_@asyncapi/parser+ServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
    * [.allows(name)](#module_@asyncapi/parser+ServerVariable+allows) ⇒ <code>boolean</code>
    * [.hasAllowedValues()](#module_@asyncapi/parser+ServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
    * [.defaultValue()](#module_@asyncapi/parser+ServerVariable+defaultValue) ⇒ <code>string</code>
    * [.hasDefaultValue()](#module_@asyncapi/parser+ServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
    * [.examples()](#module_@asyncapi/parser+ServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasDescription()](#module_@asyncapi/parser+ServerVariable+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+ServerVariable+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+ServerVariable+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+ServerVariable+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+ServerVariable+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+ServerVariable+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+ServerVariable+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+ServerVariable+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+ServerVariable+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+ServerVariable+ext) ⇒ <code>any</code>

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
<a name="module_@asyncapi/parser+ServerVariable+examples"></a>

#### serverVariable.examples() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
<a name="module_@asyncapi/parser+ServerVariable+hasDescription"></a>

#### serverVariable.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+ServerVariable+description"></a>

#### serverVariable.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+ServerVariable+hasExtensions"></a>

#### serverVariable.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+ServerVariable+extensions"></a>

#### serverVariable.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+ServerVariable+extensionKeys"></a>

#### serverVariable.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+ServerVariable+extKeys"></a>

#### serverVariable.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+ServerVariable+hasExtension"></a>

#### serverVariable.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ServerVariable+extension"></a>

#### serverVariable.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ServerVariable+hasExt"></a>

#### serverVariable.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+ServerVariable+ext"></a>

#### serverVariable.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>ServerVariable</code>](#module_@asyncapi/parser+ServerVariable)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Server"></a>

### @asyncapi/parser.Server ⇐ <code>Base</code>
Implements functions to deal with a Server object.

**Kind**: instance class of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Extends**: <code>Base</code>  
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinBindings</code>](#MixinBindings), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions), [<code>MixinTags</code>](#MixinTags)  

* [.Server](#module_@asyncapi/parser+Server) ⇐ <code>Base</code>
    * [.url()](#module_@asyncapi/parser+Server+url) ⇒ <code>string</code>
    * [.protocol()](#module_@asyncapi/parser+Server+protocol) ⇒ <code>string</code>
    * [.protocolVersion()](#module_@asyncapi/parser+Server+protocolVersion) ⇒ <code>string</code>
    * [.variables()](#module_@asyncapi/parser+Server+variables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
    * [.variable(name)](#module_@asyncapi/parser+Server+variable) ⇒ <code>ServerVariable</code>
    * [.hasVariables()](#module_@asyncapi/parser+Server+hasVariables) ⇒ <code>boolean</code>
    * [.security()](#module_@asyncapi/parser+Server+security) ⇒ <code>Array.&lt;ServerSecurityRequirement&gt;</code>
    * [.hasDescription()](#module_@asyncapi/parser+Server+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+Server+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasBindings()](#module_@asyncapi/parser+Server+hasBindings) ⇒ <code>boolean</code>
    * [.bindings()](#module_@asyncapi/parser+Server+bindings) ⇒ <code>Object</code>
    * [.bindingProtocols()](#module_@asyncapi/parser+Server+bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasBinding(name)](#module_@asyncapi/parser+Server+hasBinding) ⇒ <code>boolean</code>
    * [.binding(name)](#module_@asyncapi/parser+Server+binding) ⇒ <code>Object</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Server+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Server+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Server+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Server+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Server+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Server+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Server+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Server+ext) ⇒ <code>any</code>
    * [.hasTags()](#module_@asyncapi/parser+Server+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#module_@asyncapi/parser+Server+tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.tagNames()](#module_@asyncapi/parser+Server+tagNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasTag(name)](#module_@asyncapi/parser+Server+hasTag) ⇒ <code>boolean</code>
    * [.tag(name)](#module_@asyncapi/parser+Server+tag) ⇒ <code>Tag</code> \| <code>null</code>

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
<a name="module_@asyncapi/parser+Server+hasDescription"></a>

#### server.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+Server+description"></a>

#### server.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+Server+hasBindings"></a>

#### server.hasBindings() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasBindings</code>](#MixinBindings.hasBindings)  
<a name="module_@asyncapi/parser+Server+bindings"></a>

#### server.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>bindings</code>](#MixinBindings.bindings)  
<a name="module_@asyncapi/parser+Server+bindingProtocols"></a>

#### server.bindingProtocols() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>bindingProtocols</code>](#MixinBindings.bindingProtocols)  
<a name="module_@asyncapi/parser+Server+hasBinding"></a>

#### server.hasBinding(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasBinding</code>](#MixinBindings.hasBinding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+Server+binding"></a>

#### server.binding(name) ⇒ <code>Object</code> \| <code>null</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>binding</code>](#MixinBindings.binding)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="module_@asyncapi/parser+Server+hasExtensions"></a>

#### server.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Server+extensions"></a>

#### server.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Server+extensionKeys"></a>

#### server.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Server+extKeys"></a>

#### server.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Server+hasExtension"></a>

#### server.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Server+extension"></a>

#### server.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Server+hasExt"></a>

#### server.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Server+ext"></a>

#### server.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Server+hasTags"></a>

#### server.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasTags</code>](#MixinTags.hasTags)  
<a name="module_@asyncapi/parser+Server+tags"></a>

#### server.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>tags</code>](#MixinTags.tags)  
<a name="module_@asyncapi/parser+Server+tagNames"></a>

#### server.tagNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>tagNames</code>](#MixinTags.tagNames)  
<a name="module_@asyncapi/parser+Server+hasTag"></a>

#### server.hasTag(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>hasTag</code>](#MixinTags.hasTag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="module_@asyncapi/parser+Server+tag"></a>

#### server.tag(name) ⇒ <code>Tag</code> \| <code>null</code>
**Kind**: instance method of [<code>Server</code>](#module_@asyncapi/parser+Server)  
**Mixes**: [<code>tag</code>](#MixinTags.tag)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

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
**Mixes**: [<code>MixinDescription</code>](#MixinDescription), [<code>MixinExternalDocs</code>](#MixinExternalDocs), [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

* [.Tag](#module_@asyncapi/parser+Tag) ⇐ <code>Base</code>
    * [.name()](#module_@asyncapi/parser+Tag+name) ⇒ <code>string</code>
    * [.hasDescription()](#module_@asyncapi/parser+Tag+hasDescription) ⇒ <code>boolean</code>
    * [.description()](#module_@asyncapi/parser+Tag+description) ⇒ <code>string</code> \| <code>null</code>
    * [.hasExternalDocs()](#module_@asyncapi/parser+Tag+hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#module_@asyncapi/parser+Tag+externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>
    * [.hasExtensions()](#module_@asyncapi/parser+Tag+hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#module_@asyncapi/parser+Tag+extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#module_@asyncapi/parser+Tag+extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#module_@asyncapi/parser+Tag+extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#module_@asyncapi/parser+Tag+hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#module_@asyncapi/parser+Tag+extension) ⇒ <code>any</code>
    * [.hasExt(key)](#module_@asyncapi/parser+Tag+hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#module_@asyncapi/parser+Tag+ext) ⇒ <code>any</code>

<a name="module_@asyncapi/parser+Tag+name"></a>

#### tag.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
<a name="module_@asyncapi/parser+Tag+hasDescription"></a>

#### tag.hasDescription() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>hasDescription</code>](#MixinDescription.hasDescription)  
<a name="module_@asyncapi/parser+Tag+description"></a>

#### tag.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>description</code>](#MixinDescription.description)  
<a name="module_@asyncapi/parser+Tag+hasExternalDocs"></a>

#### tag.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>hasExternalDocs</code>](#MixinExternalDocs.hasExternalDocs)  
<a name="module_@asyncapi/parser+Tag+externalDocs"></a>

#### tag.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>externalDocs</code>](#MixinExternalDocs.externalDocs)  
<a name="module_@asyncapi/parser+Tag+hasExtensions"></a>

#### tag.hasExtensions() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>hasExtensions</code>](#MixinSpecificationExtensions.hasExtensions)  
<a name="module_@asyncapi/parser+Tag+extensions"></a>

#### tag.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>extensions</code>](#MixinSpecificationExtensions.extensions)  
<a name="module_@asyncapi/parser+Tag+extensionKeys"></a>

#### tag.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>extensionKeys</code>](#MixinSpecificationExtensions.extensionKeys)  
<a name="module_@asyncapi/parser+Tag+extKeys"></a>

#### tag.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>extKeys</code>](#MixinSpecificationExtensions.extKeys)  
<a name="module_@asyncapi/parser+Tag+hasExtension"></a>

#### tag.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>hasExtension</code>](#MixinSpecificationExtensions.hasExtension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Tag+extension"></a>

#### tag.extension(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>extension</code>](#MixinSpecificationExtensions.extension)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Tag+hasExt"></a>

#### tag.hasExt(key) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>hasExt</code>](#MixinSpecificationExtensions.hasExt)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser+Tag+ext"></a>

#### tag.ext(key) ⇒ <code>any</code>
**Kind**: instance method of [<code>Tag</code>](#module_@asyncapi/parser+Tag)  
**Mixes**: [<code>ext</code>](#MixinSpecificationExtensions.ext)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="module_@asyncapi/parser.TraverseSchemas"></a>

### @asyncapi/parser.TraverseSchemas ⇒ <code>boolean</code>
Callback used when crawling a schema.

**Kind**: static typedef of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Returns**: <code>boolean</code> - should the crawler continue crawling the schema?  

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Schema</code> | which is being crawled |
| propName | <code>String</code> | if the schema is from a property get the name of such |
| callbackType | [<code>SchemaIteratorCallbackType</code>](#SchemaIteratorCallbackType) | is the schema a new one or is the crawler finishing one. |

<a name="module_@asyncapi/parser..parse"></a>

### @asyncapi/parser~parse(asyncapiYAMLorJSON, [options]) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
Parses and validate an AsyncAPI document from YAML or JSON.

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Returns**: <code>Promise.&lt;AsyncAPIDocument&gt;</code> - The parsed AsyncAPI document.  

| Param | Type | Description |
| --- | --- | --- |
| asyncapiYAMLorJSON | <code>String</code> \| <code>Object</code> | An AsyncAPI document in JSON or YAML format. |
| [options] | <code>ParserOptions</code> | Configuration options object [ParserOptions](#asyncapiparserparseroptions--object) |

<a name="module_@asyncapi/parser..parseFromUrl"></a>

### @asyncapi/parser~parseFromUrl(url, [fetchOptions], [options]) ⇒ <code>Promise.&lt;AsyncAPIDocument&gt;</code>
Fetches an AsyncAPI document from the given URL and passes its content to the `parse` method.

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Returns**: <code>Promise.&lt;AsyncAPIDocument&gt;</code> - The parsed AsyncAPI document.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL where the AsyncAPI document is located. |
| [fetchOptions] | <code>Object</code> | Configuration to pass to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Request) call. |
| [options] | <code>ParserOptions</code> | Configuration to pass to the [ParserOptions](#asyncapiparserparseroptions--object) method. |

<a name="module_@asyncapi/parser..registerSchemaParser"></a>

### @asyncapi/parser~registerSchemaParser(parserModule)
Registers a new schema parser. Schema parsers are in charge of parsing and transforming payloads to AsyncAPI Schema format.

**Kind**: inner method of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  

| Param | Type | Description |
| --- | --- | --- |
| parserModule | <code>Object</code> | The schema parser module containing parse() and getMimeTypes() functions. |

<a name="module_@asyncapi/parser..ParserOptions"></a>

### @asyncapi/parser~ParserOptions : <code>Object</code>
The complete list of parse configuration options used to parse the given data.

**Kind**: inner typedef of [<code>@asyncapi/parser</code>](#module_@asyncapi/parser)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [path] | <code>String</code> | Path to the AsyncAPI document. It will be used to resolve relative references. Defaults to current working dir. |
| [parse] | <code>Object</code> | Options object to pass to [json-schema-ref-parser](https://apitools.dev/json-schema-ref-parser/docs/options.html). |
| [resolve] | <code>Object</code> | Options object to pass to [json-schema-ref-parser](https://apitools.dev/json-schema-ref-parser/docs/options.html). |
| [applyTraits] | <code>Boolean</code> | Whether to resolve and apply traits or not. Defaults to true. |

<a name="MixinBindings"></a>

## MixinBindings
Implements functions to deal with the common Bindings object.

**Kind**: global mixin  

* [MixinBindings](#MixinBindings)
    * [.hasBindings()](#MixinBindings.hasBindings) ⇒ <code>boolean</code>
    * [.bindings()](#MixinBindings.bindings) ⇒ <code>Object</code>
    * [.bindingProtocols()](#MixinBindings.bindingProtocols) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasBinding(name)](#MixinBindings.hasBinding) ⇒ <code>boolean</code>
    * [.binding(name)](#MixinBindings.binding) ⇒ <code>Object</code> \| <code>null</code>

<a name="MixinBindings.hasBindings"></a>

### MixinBindings.hasBindings() ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinBindings</code>](#MixinBindings)  
<a name="MixinBindings.bindings"></a>

### MixinBindings.bindings() ⇒ <code>Object</code>
**Kind**: static method of [<code>MixinBindings</code>](#MixinBindings)  
<a name="MixinBindings.bindingProtocols"></a>

### MixinBindings.bindingProtocols() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: static method of [<code>MixinBindings</code>](#MixinBindings)  
<a name="MixinBindings.hasBinding"></a>

### MixinBindings.hasBinding(name) ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinBindings</code>](#MixinBindings)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="MixinBindings.binding"></a>

### MixinBindings.binding(name) ⇒ <code>Object</code> \| <code>null</code>
**Kind**: static method of [<code>MixinBindings</code>](#MixinBindings)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="MixinDescription"></a>

## MixinDescription
Implements functions to deal with the description field.

**Kind**: global mixin  

* [MixinDescription](#MixinDescription)
    * [.hasDescription()](#MixinDescription.hasDescription) ⇒ <code>boolean</code>
    * [.description()](#MixinDescription.description) ⇒ <code>string</code> \| <code>null</code>

<a name="MixinDescription.hasDescription"></a>

### MixinDescription.hasDescription() ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinDescription</code>](#MixinDescription)  
<a name="MixinDescription.description"></a>

### MixinDescription.description() ⇒ <code>string</code> \| <code>null</code>
**Kind**: static method of [<code>MixinDescription</code>](#MixinDescription)  
<a name="MixinExternalDocs"></a>

## MixinExternalDocs
Implements functions to deal with the ExternalDocs object.

**Kind**: global mixin  

* [MixinExternalDocs](#MixinExternalDocs)
    * [.hasExternalDocs()](#MixinExternalDocs.hasExternalDocs) ⇒ <code>boolean</code>
    * [.externalDocs()](#MixinExternalDocs.externalDocs) ⇒ <code>ExternalDocs</code> \| <code>null</code>

<a name="MixinExternalDocs.hasExternalDocs"></a>

### MixinExternalDocs.hasExternalDocs() ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinExternalDocs</code>](#MixinExternalDocs)  
<a name="MixinExternalDocs.externalDocs"></a>

### MixinExternalDocs.externalDocs() ⇒ <code>ExternalDocs</code> \| <code>null</code>
**Kind**: static method of [<code>MixinExternalDocs</code>](#MixinExternalDocs)  
<a name="MixinSpecificationExtensions"></a>

## MixinSpecificationExtensions
Implements functions to deal with the SpecificationExtensions object.

**Kind**: global mixin  

* [MixinSpecificationExtensions](#MixinSpecificationExtensions)
    * [.hasExtensions()](#MixinSpecificationExtensions.hasExtensions) ⇒ <code>boolean</code>
    * [.extensions()](#MixinSpecificationExtensions.extensions) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.extensionKeys()](#MixinSpecificationExtensions.extensionKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.extKeys()](#MixinSpecificationExtensions.extKeys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasExtension(key)](#MixinSpecificationExtensions.hasExtension) ⇒ <code>boolean</code>
    * [.extension(key)](#MixinSpecificationExtensions.extension) ⇒ <code>any</code>
    * [.hasExt(key)](#MixinSpecificationExtensions.hasExt) ⇒ <code>boolean</code>
    * [.ext(key)](#MixinSpecificationExtensions.ext) ⇒ <code>any</code>

<a name="MixinSpecificationExtensions.hasExtensions"></a>

### MixinSpecificationExtensions.hasExtensions() ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  
<a name="MixinSpecificationExtensions.extensions"></a>

### MixinSpecificationExtensions.extensions() ⇒ <code>Object.&lt;string, any&gt;</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  
<a name="MixinSpecificationExtensions.extensionKeys"></a>

### MixinSpecificationExtensions.extensionKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  
<a name="MixinSpecificationExtensions.extKeys"></a>

### MixinSpecificationExtensions.extKeys() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  
<a name="MixinSpecificationExtensions.hasExtension"></a>

### MixinSpecificationExtensions.hasExtension(key) ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="MixinSpecificationExtensions.extension"></a>

### MixinSpecificationExtensions.extension(key) ⇒ <code>any</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="MixinSpecificationExtensions.hasExt"></a>

### MixinSpecificationExtensions.hasExt(key) ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="MixinSpecificationExtensions.ext"></a>

### MixinSpecificationExtensions.ext(key) ⇒ <code>any</code>
**Kind**: static method of [<code>MixinSpecificationExtensions</code>](#MixinSpecificationExtensions)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Extension key. |

<a name="MixinTags"></a>

## MixinTags
Implements functions to deal with the Tags object.

**Kind**: global mixin  

* [MixinTags](#MixinTags)
    * [.hasTags()](#MixinTags.hasTags) ⇒ <code>boolean</code>
    * [.tags()](#MixinTags.tags) ⇒ <code>Array.&lt;Tag&gt;</code>
    * [.tagNames()](#MixinTags.tagNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.hasTag(name)](#MixinTags.hasTag) ⇒ <code>boolean</code>
    * [.tag(name)](#MixinTags.tag) ⇒ <code>Tag</code> \| <code>null</code>

<a name="MixinTags.hasTags"></a>

### MixinTags.hasTags() ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinTags</code>](#MixinTags)  
<a name="MixinTags.tags"></a>

### MixinTags.tags() ⇒ <code>Array.&lt;Tag&gt;</code>
**Kind**: static method of [<code>MixinTags</code>](#MixinTags)  
<a name="MixinTags.tagNames"></a>

### MixinTags.tagNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: static method of [<code>MixinTags</code>](#MixinTags)  
<a name="MixinTags.hasTag"></a>

### MixinTags.hasTag(name) ⇒ <code>boolean</code>
**Kind**: static method of [<code>MixinTags</code>](#MixinTags)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="MixinTags.tag"></a>

### MixinTags.tag(name) ⇒ <code>Tag</code> \| <code>null</code>
**Kind**: static method of [<code>MixinTags</code>](#MixinTags)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the tag. |

<a name="SchemaIteratorCallbackType"></a>

## SchemaIteratorCallbackType
The different kind of stages when crawling a schema.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| NEW_SCHEMA | <code>string</code> | The crawler just started crawling a schema. |
| END_SCHEMA | <code>string</code> | The crawler just finished crawling a schema. |

<a name="SchemaTypesToIterate"></a>

## SchemaTypesToIterate
The different types of schemas you can iterate

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| parameters | <code>string</code> | Crawl all schemas in parameters |
| payloads | <code>string</code> | Crawl all schemas in payloads |
| headers | <code>string</code> | Crawl all schemas in headers |
| components | <code>string</code> | Crawl all schemas in components |
| objects | <code>string</code> | Crawl all schemas of type object |
| arrays | <code>string</code> | Crawl all schemas of type array |
| oneOfs | <code>string</code> | Crawl all schemas in oneOf's |
| allOfs | <code>string</code> | Crawl all schemas in allOf's |
| anyOfs | <code>string</code> | Crawl all schemas in anyOf's |
| nots | <code>string</code> | Crawl all schemas in not field |
| propertyNames | <code>string</code> | Crawl all schemas in propertyNames field |
| patternProperties | <code>string</code> | Crawl all schemas in patternProperties field |
| contains | <code>string</code> | Crawl all schemas in contains field |
| ifs | <code>string</code> | Crawl all schemas in if field |
| thenes | <code>string</code> | Crawl all schemas in then field |
| elses | <code>string</code> | Crawl all schemas in else field |
| dependencies | <code>string</code> | Crawl all schemas in dependencies field |
| definitions | <code>string</code> | Crawl all schemas in definitions field |

