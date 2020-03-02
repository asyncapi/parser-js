## Modules

<dl>
<dt><a href="#module_Parser">Parser</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#AsyncAPIDocument">AsyncAPIDocument</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with the AsyncAPI document.</p>
</dd>
<dt><a href="#Base">Base</a></dt>
<dd><p>Implements common functionality for all the models.</p>
</dd>
<dt><a href="#ChannelParameter">ChannelParameter</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a ChannelParameter object.</p>
</dd>
<dt><a href="#Channel">Channel</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a Channel object.</p>
</dd>
<dt><a href="#Components">Components</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a Components object.</p>
</dd>
<dt><a href="#Contact">Contact</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with the Contact object.</p>
</dd>
<dt><a href="#CorrelationId">CorrelationId</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a CorrelationId object.</p>
</dd>
<dt><a href="#ExternalDocs">ExternalDocs</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with an ExternalDocs object.</p>
</dd>
<dt><a href="#Info">Info</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd></dd>
<dt><a href="#License">License</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with the License object.</p>
</dd>
<dt><a href="#MessageTrait">MessageTrait</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a MessageTrait object.</p>
</dd>
<dt><a href="#MessageTraitable">MessageTraitable</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a the common properties that Message and MessageTrait objects have.</p>
</dd>
<dt><a href="#Message">Message</a> ⇐ <code><a href="#MessageTraitable">MessageTraitable</a></code></dt>
<dd><p>Implements functions to deal with a Message object.</p>
</dd>
<dt><a href="#OAuthFlow">OAuthFlow</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a OAuthFlow object.</p>
</dd>
<dt><a href="#OperationTrait">OperationTrait</a> ⇐ <code><a href="#OperationTraitable">OperationTraitable</a></code></dt>
<dd><p>Implements functions to deal with a OperationTrait object.</p>
</dd>
<dt><a href="#OperationTraitable">OperationTraitable</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with the common properties Operation and OperationTrait object have.</p>
</dd>
<dt><a href="#Operation">Operation</a> ⇐ <code><a href="#OperationTraitable">OperationTraitable</a></code></dt>
<dd><p>Implements functions to deal with an Operation object.</p>
</dd>
<dt><a href="#PublishOperation">PublishOperation</a> ⇐ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Implements functions to deal with a PublishOperation object.</p>
</dd>
<dt><a href="#Schema">Schema</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a Schema object.</p>
</dd>
<dt><a href="#SecurityScheme">SecurityScheme</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a SecurityScheme object.</p>
</dd>
<dt><a href="#ServerSecurityRequirement">ServerSecurityRequirement</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a ServerSecurityRequirement object.</p>
</dd>
<dt><a href="#ServerVariable">ServerVariable</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a ServerVariable object.</p>
</dd>
<dt><a href="#Server">Server</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a Server object.</p>
</dd>
<dt><a href="#SubscribeOperation">SubscribeOperation</a> ⇐ <code><a href="#Operation">Operation</a></code></dt>
<dd><p>Implements functions to deal with a SubscribeOperation object.</p>
</dd>
<dt><a href="#Tag">Tag</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Implements functions to deal with a Tag object.</p>
</dd>
</dl>

<a name="module_Parser"></a>

## Parser

* [Parser](#module_Parser)
    * [.parse](#module_Parser+parse) ⇒ [<code>Promise.&lt;AsyncAPIDocument&gt;</code>](#AsyncAPIDocument)
    * [.parseFromUrl](#module_Parser+parseFromUrl) ⇒ [<code>Promise.&lt;AsyncAPIDocument&gt;</code>](#AsyncAPIDocument)
    * [.registerSchemaParser](#module_Parser+registerSchemaParser)

<a name="module_Parser+parse"></a>

### parser.parse ⇒ [<code>Promise.&lt;AsyncAPIDocument&gt;</code>](#AsyncAPIDocument)
Parses and validate an AsyncAPI document from YAML or JSON.

**Kind**: instance property of [<code>Parser</code>](#module_Parser)  
**Returns**: [<code>Promise.&lt;AsyncAPIDocument&gt;</code>](#AsyncAPIDocument) - The parsed AsyncAPI document.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| asyncapiYAMLorJSON | <code>String</code> |  | An AsyncAPI document in JSON or YAML format. |
| [options] | <code>Object</code> |  | Configuration options. |
| [options.path] | <code>String</code> |  | Path to the AsyncAPI document. It will be used to resolve relative references. |
| [options.parse] | <code>Object</code> |  | Options object to pass to [json-schema-ref-parser](https://apidevtools.org/json-schema-ref-parser/docs/options.html). |
| [options.resolve] | <code>Object</code> |  | Options object to pass to [json-schema-ref-parser](https://apidevtools.org/json-schema-ref-parser/docs/options.html). |
| [options.dereference] | <code>Object</code> |  | Options object to pass to [json-schema-ref-parser](https://apidevtools.org/json-schema-ref-parser/docs/options.html). |
| [options.applyTraits] | <code>Object</code> | <code>true</code> | Whether to resolve and apply traits or not. |

<a name="module_Parser+parseFromUrl"></a>

### parser.parseFromUrl ⇒ [<code>Promise.&lt;AsyncAPIDocument&gt;</code>](#AsyncAPIDocument)
Fetches an AsyncAPI document from the given URL and passes its content to the `parse` method.

**Kind**: instance property of [<code>Parser</code>](#module_Parser)  
**Returns**: [<code>Promise.&lt;AsyncAPIDocument&gt;</code>](#AsyncAPIDocument) - The parsed AsyncAPI document.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL where the AsyncAPI document is located. |
| [fetchOptions] | <code>Object</code> | Configuration to pass to the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Request) call. |
| [options] | <code>Object</code> | Configuration to pass to the [parse](#module_Parser+parse) method. |

<a name="module_Parser+registerSchemaParser"></a>

### parser.registerSchemaParser
Registers a new schema parser. Schema parsers are in charge of parsing and transforming payloads to AsyncAPI Schema format.

**Kind**: instance property of [<code>Parser</code>](#module_Parser)  

| Param | Type | Description |
| --- | --- | --- |
| schemaFormats | <code>Array.&lt;string&gt;</code> | An array of schema formats the given schema parser is able to recognize and transform. |
| parserFunction | <code>function</code> | The schema parser function. |

<a name="AsyncAPIDocument"></a>

## AsyncAPIDocument ⇐ [<code>Base</code>](#Base)
Implements functions to deal with the AsyncAPI document.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [AsyncAPIDocument](#AsyncAPIDocument) ⇐ [<code>Base</code>](#Base)
    * [.version()](#AsyncAPIDocument+version) ⇒ <code>string</code>
    * [.info()](#AsyncAPIDocument+info) ⇒ [<code>Info</code>](#Info)
    * [.id()](#AsyncAPIDocument+id) ⇒ <code>string</code>
    * [.hasServers()](#AsyncAPIDocument+hasServers) ⇒ <code>boolean</code>
    * [.servers()](#AsyncAPIDocument+servers) ⇒ <code>Object.&lt;string, Server&gt;</code>
    * [.server(name)](#AsyncAPIDocument+server) ⇒ [<code>Server</code>](#Server)
    * [.hasChannels()](#AsyncAPIDocument+hasChannels) ⇒ <code>boolean</code>
    * [.channels()](#AsyncAPIDocument+channels) ⇒ <code>Object.&lt;string, Channel&gt;</code>
    * [.channelNames()](#AsyncAPIDocument+channelNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.channel(name)](#AsyncAPIDocument+channel) ⇒ [<code>Channel</code>](#Channel)
    * [.defaultContentType()](#AsyncAPIDocument+defaultContentType) ⇒ <code>string</code>
    * [.hasComponents()](#AsyncAPIDocument+hasComponents) ⇒ <code>boolean</code>
    * [.components()](#AsyncAPIDocument+components) ⇒ [<code>Components</code>](#Components)
    * [.hasTags()](#AsyncAPIDocument+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#AsyncAPIDocument+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.allMessages()](#AsyncAPIDocument+allMessages) ⇒ [<code>Map.&lt;Message&gt;</code>](#Message)
    * [.allSchemas()](#AsyncAPIDocument+allSchemas) ⇒ [<code>Map.&lt;Schema&gt;</code>](#Schema)
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="AsyncAPIDocument+version"></a>

### asyncAPIDocument.version() ⇒ <code>string</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+info"></a>

### asyncAPIDocument.info() ⇒ [<code>Info</code>](#Info)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+id"></a>

### asyncAPIDocument.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+hasServers"></a>

### asyncAPIDocument.hasServers() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+servers"></a>

### asyncAPIDocument.servers() ⇒ <code>Object.&lt;string, Server&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+server"></a>

### asyncAPIDocument.server(name) ⇒ [<code>Server</code>](#Server)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server. |

<a name="AsyncAPIDocument+hasChannels"></a>

### asyncAPIDocument.hasChannels() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+channels"></a>

### asyncAPIDocument.channels() ⇒ <code>Object.&lt;string, Channel&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+channelNames"></a>

### asyncAPIDocument.channelNames() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+channel"></a>

### asyncAPIDocument.channel(name) ⇒ [<code>Channel</code>](#Channel)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the channel. |

<a name="AsyncAPIDocument+defaultContentType"></a>

### asyncAPIDocument.defaultContentType() ⇒ <code>string</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+hasComponents"></a>

### asyncAPIDocument.hasComponents() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+components"></a>

### asyncAPIDocument.components() ⇒ [<code>Components</code>](#Components)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+hasTags"></a>

### asyncAPIDocument.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+tags"></a>

### asyncAPIDocument.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+allMessages"></a>

### asyncAPIDocument.allMessages() ⇒ [<code>Map.&lt;Message&gt;</code>](#Message)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="AsyncAPIDocument+allSchemas"></a>

### asyncAPIDocument.allSchemas() ⇒ [<code>Map.&lt;Schema&gt;</code>](#Schema)
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
<a name="Base+json"></a>

### asyncAPIDocument.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>AsyncAPIDocument</code>](#AsyncAPIDocument)  
**Overrides**: [<code>json</code>](#Base+json)  
<a name="Base"></a>

## Base
Implements common functionality for all the models.

**Kind**: global class  
<a name="Base+json"></a>

### base.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Base</code>](#Base)  
<a name="ChannelParameter"></a>

## ChannelParameter ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a ChannelParameter object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [ChannelParameter](#ChannelParameter) ⇐ [<code>Base</code>](#Base)
    * [.description()](#ChannelParameter+description) ⇒ <code>string</code>
    * [.location()](#ChannelParameter+location) ⇒ <code>string</code>
    * [.schema()](#ChannelParameter+schema) ⇒ [<code>Schema</code>](#Schema)
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="ChannelParameter+description"></a>

### channelParameter.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#ChannelParameter)  
<a name="ChannelParameter+location"></a>

### channelParameter.location() ⇒ <code>string</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#ChannelParameter)  
<a name="ChannelParameter+schema"></a>

### channelParameter.schema() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>ChannelParameter</code>](#ChannelParameter)  
<a name="Base+json"></a>

### channelParameter.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>ChannelParameter</code>](#ChannelParameter)  
<a name="Channel"></a>

## Channel ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a Channel object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Channel](#Channel) ⇐ [<code>Base</code>](#Base)
    * [.description()](#Channel+description) ⇒ <code>string</code>
    * [.parameters()](#Channel+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
    * [.parameter(name)](#Channel+parameter) ⇒ [<code>ChannelParameter</code>](#ChannelParameter)
    * [.hasParameters()](#Channel+hasParameters) ⇒ <code>boolean</code>
    * [.publish()](#Channel+publish) ⇒ [<code>PublishOperation</code>](#PublishOperation)
    * [.subscribe()](#Channel+subscribe) ⇒ [<code>SubscribeOperation</code>](#SubscribeOperation)
    * [.hasPublish()](#Channel+hasPublish) ⇒ <code>boolean</code>
    * [.hasSubscribe()](#Channel+hasSubscribe) ⇒ <code>boolean</code>
    * [.bindings()](#Channel+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#Channel+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Channel+description"></a>

### channel.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+parameters"></a>

### channel.parameters() ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+parameter"></a>

### channel.parameter(name) ⇒ [<code>ChannelParameter</code>](#ChannelParameter)
**Kind**: instance method of [<code>Channel</code>](#Channel)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the parameter. |

<a name="Channel+hasParameters"></a>

### channel.hasParameters() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+publish"></a>

### channel.publish() ⇒ [<code>PublishOperation</code>](#PublishOperation)
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+subscribe"></a>

### channel.subscribe() ⇒ [<code>SubscribeOperation</code>](#SubscribeOperation)
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+hasPublish"></a>

### channel.hasPublish() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+hasSubscribe"></a>

### channel.hasSubscribe() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+bindings"></a>

### channel.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Channel+binding"></a>

### channel.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### channel.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Channel</code>](#Channel)  
<a name="Components"></a>

## Components ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a Components object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Components](#Components) ⇐ [<code>Base</code>](#Base)
    * [.messages()](#Components+messages) ⇒ <code>Object.&lt;string, Message&gt;</code>
    * [.message()](#Components+message) ⇒ [<code>Message</code>](#Message)
    * [.schemas()](#Components+schemas) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.schema()](#Components+schema) ⇒ [<code>Schema</code>](#Schema)
    * [.securitySchemes()](#Components+securitySchemes) ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
    * [.securityScheme()](#Components+securityScheme) ⇒ [<code>SecurityScheme</code>](#SecurityScheme)
    * [.parameters()](#Components+parameters) ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
    * [.parameter()](#Components+parameter) ⇒ [<code>ChannelParameter</code>](#ChannelParameter)
    * [.correlationIds()](#Components+correlationIds) ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
    * [.correlationId()](#Components+correlationId) ⇒ [<code>CorrelationId</code>](#CorrelationId)
    * [.operationTraits()](#Components+operationTraits) ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
    * [.operationTrait()](#Components+operationTrait) ⇒ [<code>OperationTrait</code>](#OperationTrait)
    * [.messageTraits()](#Components+messageTraits) ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
    * [.messageTrait()](#Components+messageTrait) ⇒ [<code>MessageTrait</code>](#MessageTrait)
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Components+messages"></a>

### components.messages() ⇒ <code>Object.&lt;string, Message&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+message"></a>

### components.message() ⇒ [<code>Message</code>](#Message)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+schemas"></a>

### components.schemas() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+schema"></a>

### components.schema() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+securitySchemes"></a>

### components.securitySchemes() ⇒ <code>Object.&lt;string, SecurityScheme&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+securityScheme"></a>

### components.securityScheme() ⇒ [<code>SecurityScheme</code>](#SecurityScheme)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+parameters"></a>

### components.parameters() ⇒ <code>Object.&lt;string, ChannelParameter&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+parameter"></a>

### components.parameter() ⇒ [<code>ChannelParameter</code>](#ChannelParameter)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+correlationIds"></a>

### components.correlationIds() ⇒ <code>Object.&lt;string, CorrelationId&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+correlationId"></a>

### components.correlationId() ⇒ [<code>CorrelationId</code>](#CorrelationId)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+operationTraits"></a>

### components.operationTraits() ⇒ <code>Object.&lt;string, OperationTrait&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+operationTrait"></a>

### components.operationTrait() ⇒ [<code>OperationTrait</code>](#OperationTrait)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+messageTraits"></a>

### components.messageTraits() ⇒ <code>Object.&lt;string, MessageTrait&gt;</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components+messageTrait"></a>

### components.messageTrait() ⇒ [<code>MessageTrait</code>](#MessageTrait)
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Base+json"></a>

### components.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Contact"></a>

## Contact ⇐ [<code>Base</code>](#Base)
Implements functions to deal with the Contact object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Contact](#Contact) ⇐ [<code>Base</code>](#Base)
    * [.name()](#Contact+name) ⇒ <code>string</code>
    * [.url()](#Contact+url) ⇒ <code>string</code>
    * [.email()](#Contact+email) ⇒ <code>string</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Contact+name"></a>

### contact.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#Contact)  
<a name="Contact+url"></a>

### contact.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#Contact)  
<a name="Contact+email"></a>

### contact.email() ⇒ <code>string</code>
**Kind**: instance method of [<code>Contact</code>](#Contact)  
<a name="Base+json"></a>

### contact.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Contact</code>](#Contact)  
<a name="CorrelationId"></a>

## CorrelationId ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a CorrelationId object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [CorrelationId](#CorrelationId) ⇐ [<code>Base</code>](#Base)
    * [.description()](#CorrelationId+description) ⇒ <code>string</code>
    * [.location()](#CorrelationId+location) ⇒ <code>string</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="CorrelationId+description"></a>

### correlationId.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>CorrelationId</code>](#CorrelationId)  
<a name="CorrelationId+location"></a>

### correlationId.location() ⇒ <code>string</code>
**Kind**: instance method of [<code>CorrelationId</code>](#CorrelationId)  
<a name="Base+json"></a>

### correlationId.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>CorrelationId</code>](#CorrelationId)  
<a name="ExternalDocs"></a>

## ExternalDocs ⇐ [<code>Base</code>](#Base)
Implements functions to deal with an ExternalDocs object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [ExternalDocs](#ExternalDocs) ⇐ [<code>Base</code>](#Base)
    * [.description()](#ExternalDocs+description) ⇒ <code>string</code>
    * [.url()](#ExternalDocs+url) ⇒ <code>string</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="ExternalDocs+description"></a>

### externalDocs.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#ExternalDocs)  
<a name="ExternalDocs+url"></a>

### externalDocs.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#ExternalDocs)  
<a name="Base+json"></a>

### externalDocs.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>ExternalDocs</code>](#ExternalDocs)  
<a name="Info"></a>

## Info ⇐ [<code>Base</code>](#Base)
**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Info](#Info) ⇐ [<code>Base</code>](#Base)
    * [new Info()](#new_Info_new)
    * [.title()](#Info+title) ⇒ <code>string</code>
    * [.version()](#Info+version) ⇒ <code>string</code>
    * [.license()](#Info+license) ⇒ [<code>License</code>](#License)
    * [.contact()](#Info+contact) ⇒ [<code>Contact</code>](#Contact)
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="new_Info_new"></a>

### new Info()
Implements functions to deal with the Info object.

<a name="Info+title"></a>

### info.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>Info</code>](#Info)  
<a name="Info+version"></a>

### info.version() ⇒ <code>string</code>
**Kind**: instance method of [<code>Info</code>](#Info)  
<a name="Info+license"></a>

### info.license() ⇒ [<code>License</code>](#License)
**Kind**: instance method of [<code>Info</code>](#Info)  
<a name="Info+contact"></a>

### info.contact() ⇒ [<code>Contact</code>](#Contact)
**Kind**: instance method of [<code>Info</code>](#Info)  
<a name="Base+json"></a>

### info.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Info</code>](#Info)  
<a name="License"></a>

## License ⇐ [<code>Base</code>](#Base)
Implements functions to deal with the License object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [License](#License) ⇐ [<code>Base</code>](#Base)
    * [.name()](#License+name) ⇒ <code>string</code>
    * [.url()](#License+url) ⇒ <code>string</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="License+name"></a>

### license.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>License</code>](#License)  
<a name="License+url"></a>

### license.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>License</code>](#License)  
<a name="Base+json"></a>

### license.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>License</code>](#License)  
<a name="MessageTrait"></a>

## MessageTrait ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a MessageTrait object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  
<a name="Base+json"></a>

### messageTrait.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>MessageTrait</code>](#MessageTrait)  
<a name="MessageTraitable"></a>

## MessageTraitable ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a the common properties that Message and MessageTrait objects have.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [MessageTraitable](#MessageTraitable) ⇐ [<code>Base</code>](#Base)
    * [.headers()](#MessageTraitable+headers) ⇒ [<code>Schema</code>](#Schema)
    * [.header(name)](#MessageTraitable+header) ⇒ [<code>Schema</code>](#Schema)
    * [.correlationId()](#MessageTraitable+correlationId) ⇒ [<code>CorrelationId</code>](#CorrelationId)
    * [.schemaFormat()](#MessageTraitable+schemaFormat) ⇒ <code>string</code>
    * [.contentType()](#MessageTraitable+contentType) ⇒ <code>string</code>
    * [.name()](#MessageTraitable+name) ⇒ <code>string</code>
    * [.title()](#MessageTraitable+title) ⇒ <code>string</code>
    * [.summary()](#MessageTraitable+summary) ⇒ <code>string</code>
    * [.description()](#MessageTraitable+description) ⇒ <code>string</code>
    * [.externalDocs()](#MessageTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.hasTags()](#MessageTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#MessageTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.bindings()](#MessageTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#MessageTraitable+binding) ⇒ <code>Object</code>
    * [.examples()](#MessageTraitable+examples) ⇒ <code>Array.&lt;any&gt;</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="MessageTraitable+headers"></a>

### messageTraitable.headers() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+header"></a>

### messageTraitable.header(name) ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the header. |

<a name="MessageTraitable+correlationId"></a>

### messageTraitable.correlationId() ⇒ [<code>CorrelationId</code>](#CorrelationId)
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+schemaFormat"></a>

### messageTraitable.schemaFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+contentType"></a>

### messageTraitable.contentType() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+name"></a>

### messageTraitable.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+title"></a>

### messageTraitable.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+summary"></a>

### messageTraitable.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+description"></a>

### messageTraitable.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+externalDocs"></a>

### messageTraitable.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+hasTags"></a>

### messageTraitable.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+tags"></a>

### messageTraitable.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+bindings"></a>

### messageTraitable.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="MessageTraitable+binding"></a>

### messageTraitable.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="MessageTraitable+examples"></a>

### messageTraitable.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="Base+json"></a>

### messageTraitable.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>MessageTraitable</code>](#MessageTraitable)  
<a name="Message"></a>

## Message ⇐ [<code>MessageTraitable</code>](#MessageTraitable)
Implements functions to deal with a Message object.

**Kind**: global class  
**Extends**: [<code>MessageTraitable</code>](#MessageTraitable)  

* [Message](#Message) ⇐ [<code>MessageTraitable</code>](#MessageTraitable)
    * [.uid()](#Message+uid) ⇒ <code>string</code>
    * [.payload()](#Message+payload) ⇒ [<code>Schema</code>](#Schema)
    * [.originalPayload()](#Message+originalPayload) ⇒ <code>any</code>
    * [.originalSchemaFormat()](#Message+originalSchemaFormat) ⇒ <code>string</code>
    * [.headers()](#MessageTraitable+headers) ⇒ [<code>Schema</code>](#Schema)
    * [.header(name)](#MessageTraitable+header) ⇒ [<code>Schema</code>](#Schema)
    * [.correlationId()](#MessageTraitable+correlationId) ⇒ [<code>CorrelationId</code>](#CorrelationId)
    * [.schemaFormat()](#MessageTraitable+schemaFormat) ⇒ <code>string</code>
    * [.contentType()](#MessageTraitable+contentType) ⇒ <code>string</code>
    * [.name()](#MessageTraitable+name) ⇒ <code>string</code>
    * [.title()](#MessageTraitable+title) ⇒ <code>string</code>
    * [.summary()](#MessageTraitable+summary) ⇒ <code>string</code>
    * [.description()](#MessageTraitable+description) ⇒ <code>string</code>
    * [.externalDocs()](#MessageTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.hasTags()](#MessageTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#MessageTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.bindings()](#MessageTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#MessageTraitable+binding) ⇒ <code>Object</code>
    * [.examples()](#MessageTraitable+examples) ⇒ <code>Array.&lt;any&gt;</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Message+uid"></a>

### message.uid() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+payload"></a>

### message.payload() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+originalPayload"></a>

### message.originalPayload() ⇒ <code>any</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+originalSchemaFormat"></a>

### message.originalSchemaFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+headers"></a>

### message.headers() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+header"></a>

### message.header(name) ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Message</code>](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the header. |

<a name="MessageTraitable+correlationId"></a>

### message.correlationId() ⇒ [<code>CorrelationId</code>](#CorrelationId)
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+schemaFormat"></a>

### message.schemaFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+contentType"></a>

### message.contentType() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+name"></a>

### message.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+title"></a>

### message.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+summary"></a>

### message.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+description"></a>

### message.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+externalDocs"></a>

### message.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+hasTags"></a>

### message.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+tags"></a>

### message.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+bindings"></a>

### message.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="MessageTraitable+binding"></a>

### message.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Message</code>](#Message)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="MessageTraitable+examples"></a>

### message.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Base+json"></a>

### message.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="OAuthFlow"></a>

## OAuthFlow ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a OAuthFlow object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [OAuthFlow](#OAuthFlow) ⇐ [<code>Base</code>](#Base)
    * [.authorizationUrl()](#OAuthFlow+authorizationUrl) ⇒ <code>string</code>
    * [.tokenUrl()](#OAuthFlow+tokenUrl) ⇒ <code>string</code>
    * [.refreshUrl()](#OAuthFlow+refreshUrl) ⇒ <code>string</code>
    * [.scopes()](#OAuthFlow+scopes) ⇒ <code>Object.&lt;string, string&gt;</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="OAuthFlow+authorizationUrl"></a>

### oAuthFlow.authorizationUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#OAuthFlow)  
<a name="OAuthFlow+tokenUrl"></a>

### oAuthFlow.tokenUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#OAuthFlow)  
<a name="OAuthFlow+refreshUrl"></a>

### oAuthFlow.refreshUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#OAuthFlow)  
<a name="OAuthFlow+scopes"></a>

### oAuthFlow.scopes() ⇒ <code>Object.&lt;string, string&gt;</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#OAuthFlow)  
<a name="Base+json"></a>

### oAuthFlow.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>OAuthFlow</code>](#OAuthFlow)  
<a name="OperationTrait"></a>

## OperationTrait ⇐ [<code>OperationTraitable</code>](#OperationTraitable)
Implements functions to deal with a OperationTrait object.

**Kind**: global class  
**Extends**: [<code>OperationTraitable</code>](#OperationTraitable)  

* [OperationTrait](#OperationTrait) ⇐ [<code>OperationTraitable</code>](#OperationTraitable)
    * [.id()](#OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#OperationTraitable+summary) ⇒ <code>string</code>
    * [.description()](#OperationTraitable+description) ⇒ <code>string</code>
    * [.hasTags()](#OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#OperationTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.externalDocs()](#OperationTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.bindings()](#OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#OperationTraitable+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="OperationTraitable+id"></a>

### operationTrait.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+summary"></a>

### operationTrait.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+description"></a>

### operationTrait.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+hasTags"></a>

### operationTrait.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+tags"></a>

### operationTrait.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+externalDocs"></a>

### operationTrait.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+bindings"></a>

### operationTrait.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable+binding"></a>

### operationTrait.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### operationTrait.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>OperationTrait</code>](#OperationTrait)  
<a name="OperationTraitable"></a>

## OperationTraitable ⇐ [<code>Base</code>](#Base)
Implements functions to deal with the common properties Operation and OperationTrait object have.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [OperationTraitable](#OperationTraitable) ⇐ [<code>Base</code>](#Base)
    * [.id()](#OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#OperationTraitable+summary) ⇒ <code>string</code>
    * [.description()](#OperationTraitable+description) ⇒ <code>string</code>
    * [.hasTags()](#OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#OperationTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.externalDocs()](#OperationTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.bindings()](#OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#OperationTraitable+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="OperationTraitable+id"></a>

### operationTraitable.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+summary"></a>

### operationTraitable.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+description"></a>

### operationTraitable.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+hasTags"></a>

### operationTraitable.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+tags"></a>

### operationTraitable.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+externalDocs"></a>

### operationTraitable.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+bindings"></a>

### operationTraitable.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="OperationTraitable+binding"></a>

### operationTraitable.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### operationTraitable.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>OperationTraitable</code>](#OperationTraitable)  
<a name="Operation"></a>

## Operation ⇐ [<code>OperationTraitable</code>](#OperationTraitable)
Implements functions to deal with an Operation object.

**Kind**: global class  
**Extends**: [<code>OperationTraitable</code>](#OperationTraitable)  

* [Operation](#Operation) ⇐ [<code>OperationTraitable</code>](#OperationTraitable)
    * [.hasMultipleMessages()](#Operation+hasMultipleMessages) ⇒ <code>boolean</code>
    * [.messages()](#Operation+messages) ⇒ [<code>Array.&lt;Message&gt;</code>](#Message)
    * [.message()](#Operation+message) ⇒ [<code>Message</code>](#Message)
    * [.id()](#OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#OperationTraitable+summary) ⇒ <code>string</code>
    * [.description()](#OperationTraitable+description) ⇒ <code>string</code>
    * [.hasTags()](#OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#OperationTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.externalDocs()](#OperationTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.bindings()](#OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#OperationTraitable+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Operation+hasMultipleMessages"></a>

### operation.hasMultipleMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="Operation+messages"></a>

### operation.messages() ⇒ [<code>Array.&lt;Message&gt;</code>](#Message)
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="Operation+message"></a>

### operation.message() ⇒ [<code>Message</code>](#Message)
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+id"></a>

### operation.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+summary"></a>

### operation.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+description"></a>

### operation.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+hasTags"></a>

### operation.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+tags"></a>

### operation.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+externalDocs"></a>

### operation.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+bindings"></a>

### operation.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="OperationTraitable+binding"></a>

### operation.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### operation.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Operation</code>](#Operation)  
<a name="PublishOperation"></a>

## PublishOperation ⇐ [<code>Operation</code>](#Operation)
Implements functions to deal with a PublishOperation object.

**Kind**: global class  
**Extends**: [<code>Operation</code>](#Operation)  

* [PublishOperation](#PublishOperation) ⇐ [<code>Operation</code>](#Operation)
    * [.isPublish()](#PublishOperation+isPublish) ⇒ <code>boolean</code>
    * [.isSubscribe()](#PublishOperation+isSubscribe) ⇒ <code>boolean</code>
    * [.kind()](#PublishOperation+kind) ⇒ <code>string</code>
    * [.hasMultipleMessages()](#Operation+hasMultipleMessages) ⇒ <code>boolean</code>
    * [.messages()](#Operation+messages) ⇒ [<code>Array.&lt;Message&gt;</code>](#Message)
    * [.message()](#Operation+message) ⇒ [<code>Message</code>](#Message)
    * [.id()](#OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#OperationTraitable+summary) ⇒ <code>string</code>
    * [.description()](#OperationTraitable+description) ⇒ <code>string</code>
    * [.hasTags()](#OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#OperationTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.externalDocs()](#OperationTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.bindings()](#OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#OperationTraitable+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="PublishOperation+isPublish"></a>

### publishOperation.isPublish() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="PublishOperation+isSubscribe"></a>

### publishOperation.isSubscribe() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="PublishOperation+kind"></a>

### publishOperation.kind() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="Operation+hasMultipleMessages"></a>

### publishOperation.hasMultipleMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="Operation+messages"></a>

### publishOperation.messages() ⇒ [<code>Array.&lt;Message&gt;</code>](#Message)
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="Operation+message"></a>

### publishOperation.message() ⇒ [<code>Message</code>](#Message)
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+id"></a>

### publishOperation.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+summary"></a>

### publishOperation.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+description"></a>

### publishOperation.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+hasTags"></a>

### publishOperation.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+tags"></a>

### publishOperation.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+externalDocs"></a>

### publishOperation.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+bindings"></a>

### publishOperation.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="OperationTraitable+binding"></a>

### publishOperation.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### publishOperation.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>PublishOperation</code>](#PublishOperation)  
<a name="Schema"></a>

## Schema ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a Schema object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Schema](#Schema) ⇐ [<code>Base</code>](#Base)
    * [.uid()](#Schema+uid) ⇒ <code>string</code>
    * [.$id()](#Schema+$id) ⇒ <code>string</code>
    * [.multipleOf()](#Schema+multipleOf) ⇒ <code>number</code>
    * [.maximum()](#Schema+maximum) ⇒ <code>number</code>
    * [.exclusiveMaximum()](#Schema+exclusiveMaximum) ⇒ <code>number</code>
    * [.minimum()](#Schema+minimum) ⇒ <code>number</code>
    * [.exclusiveMinimum()](#Schema+exclusiveMinimum) ⇒ <code>number</code>
    * [.maxLength()](#Schema+maxLength) ⇒ <code>number</code>
    * [.minLength()](#Schema+minLength) ⇒ <code>number</code>
    * [.pattern()](#Schema+pattern) ⇒ <code>string</code>
    * [.maxItems()](#Schema+maxItems) ⇒ <code>number</code>
    * [.minItems()](#Schema+minItems) ⇒ <code>number</code>
    * [.uniqueItems()](#Schema+uniqueItems) ⇒ <code>boolean</code>
    * [.maxProperties()](#Schema+maxProperties) ⇒ <code>number</code>
    * [.minProperties()](#Schema+minProperties) ⇒ <code>number</code>
    * [.required()](#Schema+required) ⇒ <code>Array.&lt;string&gt;</code>
    * [.enum()](#Schema+enum) ⇒ <code>Array.&lt;any&gt;</code>
    * [.type()](#Schema+type) ⇒ <code>string</code>
    * [.allOf()](#Schema+allOf) ⇒ [<code>Array.&lt;Schema&gt;</code>](#Schema)
    * [.oneOf()](#Schema+oneOf) ⇒ [<code>Array.&lt;Schema&gt;</code>](#Schema)
    * [.anyOf()](#Schema+anyOf) ⇒ [<code>Array.&lt;Schema&gt;</code>](#Schema)
    * [.not()](#Schema+not) ⇒ [<code>Schema</code>](#Schema)
    * [.items()](#Schema+items) ⇒ [<code>Schema</code>](#Schema) \| [<code>Array.&lt;Schema&gt;</code>](#Schema)
    * [.properties()](#Schema+properties) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.additionalProperties()](#Schema+additionalProperties) ⇒ <code>boolean</code> \| [<code>Schema</code>](#Schema)
    * [.additionalItems()](#Schema+additionalItems) ⇒ [<code>Schema</code>](#Schema)
    * [.patternProperties()](#Schema+patternProperties) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.const()](#Schema+const) ⇒ <code>any</code>
    * [.contains()](#Schema+contains) ⇒ [<code>Schema</code>](#Schema)
    * [.dependencies()](#Schema+dependencies) ⇒ <code>Object.&lt;string, (Schema\|Array.&lt;string&gt;)&gt;</code>
    * [.propertyNames()](#Schema+propertyNames) ⇒ [<code>Schema</code>](#Schema)
    * [.if()](#Schema+if) ⇒ [<code>Schema</code>](#Schema)
    * [.then()](#Schema+then) ⇒ [<code>Schema</code>](#Schema)
    * [.else()](#Schema+else) ⇒ [<code>Schema</code>](#Schema)
    * [.format()](#Schema+format) ⇒ <code>string</code>
    * [.contentEncoding()](#Schema+contentEncoding) ⇒ <code>string</code>
    * [.contentMediaType()](#Schema+contentMediaType) ⇒ <code>string</code>
    * [.definitions()](#Schema+definitions) ⇒ <code>Object.&lt;string, Schema&gt;</code>
    * [.description()](#Schema+description) ⇒ <code>string</code>
    * [.title()](#Schema+title) ⇒ <code>string</code>
    * [.default()](#Schema+default) ⇒ <code>any</code>
    * [.readOnly()](#Schema+readOnly) ⇒ <code>boolean</code>
    * [.writeOnly()](#Schema+writeOnly) ⇒ <code>boolean</code>
    * [.examples()](#Schema+examples) ⇒ <code>Array.&lt;any&gt;</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Schema+uid"></a>

### schema.uid() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+$id"></a>

### schema.$id() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+multipleOf"></a>

### schema.multipleOf() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+maximum"></a>

### schema.maximum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+exclusiveMaximum"></a>

### schema.exclusiveMaximum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+minimum"></a>

### schema.minimum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+exclusiveMinimum"></a>

### schema.exclusiveMinimum() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+maxLength"></a>

### schema.maxLength() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+minLength"></a>

### schema.minLength() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+pattern"></a>

### schema.pattern() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+maxItems"></a>

### schema.maxItems() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+minItems"></a>

### schema.minItems() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+uniqueItems"></a>

### schema.uniqueItems() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+maxProperties"></a>

### schema.maxProperties() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+minProperties"></a>

### schema.minProperties() ⇒ <code>number</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+required"></a>

### schema.required() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+enum"></a>

### schema.enum() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+type"></a>

### schema.type() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+allOf"></a>

### schema.allOf() ⇒ [<code>Array.&lt;Schema&gt;</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+oneOf"></a>

### schema.oneOf() ⇒ [<code>Array.&lt;Schema&gt;</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+anyOf"></a>

### schema.anyOf() ⇒ [<code>Array.&lt;Schema&gt;</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+not"></a>

### schema.not() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+items"></a>

### schema.items() ⇒ [<code>Schema</code>](#Schema) \| [<code>Array.&lt;Schema&gt;</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+properties"></a>

### schema.properties() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+additionalProperties"></a>

### schema.additionalProperties() ⇒ <code>boolean</code> \| [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+additionalItems"></a>

### schema.additionalItems() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+patternProperties"></a>

### schema.patternProperties() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+const"></a>

### schema.const() ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+contains"></a>

### schema.contains() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+dependencies"></a>

### schema.dependencies() ⇒ <code>Object.&lt;string, (Schema\|Array.&lt;string&gt;)&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+propertyNames"></a>

### schema.propertyNames() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+if"></a>

### schema.if() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+then"></a>

### schema.then() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+else"></a>

### schema.else() ⇒ [<code>Schema</code>](#Schema)
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+format"></a>

### schema.format() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+contentEncoding"></a>

### schema.contentEncoding() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+contentMediaType"></a>

### schema.contentMediaType() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+definitions"></a>

### schema.definitions() ⇒ <code>Object.&lt;string, Schema&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+description"></a>

### schema.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+title"></a>

### schema.title() ⇒ <code>string</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+default"></a>

### schema.default() ⇒ <code>any</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+readOnly"></a>

### schema.readOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+writeOnly"></a>

### schema.writeOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Schema+examples"></a>

### schema.examples() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="Base+json"></a>

### schema.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Schema</code>](#Schema)  
<a name="SecurityScheme"></a>

## SecurityScheme ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a SecurityScheme object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [SecurityScheme](#SecurityScheme) ⇐ [<code>Base</code>](#Base)
    * [.type()](#SecurityScheme+type) ⇒ <code>string</code>
    * [.description()](#SecurityScheme+description) ⇒ <code>string</code>
    * [.name()](#SecurityScheme+name) ⇒ <code>string</code>
    * [.in()](#SecurityScheme+in) ⇒ <code>string</code>
    * [.scheme()](#SecurityScheme+scheme) ⇒ <code>string</code>
    * [.bearerFormat()](#SecurityScheme+bearerFormat) ⇒ <code>string</code>
    * [.openIdConnectUrl()](#SecurityScheme+openIdConnectUrl) ⇒ <code>string</code>
    * [.flows()](#SecurityScheme+flows) ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="SecurityScheme+type"></a>

### securityScheme.type() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+description"></a>

### securityScheme.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+name"></a>

### securityScheme.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+in"></a>

### securityScheme.in() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+scheme"></a>

### securityScheme.scheme() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+bearerFormat"></a>

### securityScheme.bearerFormat() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+openIdConnectUrl"></a>

### securityScheme.openIdConnectUrl() ⇒ <code>string</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="SecurityScheme+flows"></a>

### securityScheme.flows() ⇒ <code>Object.&lt;string, OAuthFlow&gt;</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="Base+json"></a>

### securityScheme.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>SecurityScheme</code>](#SecurityScheme)  
<a name="ServerSecurityRequirement"></a>

## ServerSecurityRequirement ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a ServerSecurityRequirement object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  
<a name="Base+json"></a>

### serverSecurityRequirement.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>ServerSecurityRequirement</code>](#ServerSecurityRequirement)  
<a name="ServerVariable"></a>

## ServerVariable ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a ServerVariable object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [ServerVariable](#ServerVariable) ⇐ [<code>Base</code>](#Base)
    * [.allowedValues()](#ServerVariable+allowedValues) ⇒ <code>Array.&lt;any&gt;</code>
    * [.allows(name)](#ServerVariable+allows) ⇒ <code>boolean</code>
    * [.hasAllowedValues()](#ServerVariable+hasAllowedValues) ⇒ <code>boolean</code>
    * [.defaultValue()](#ServerVariable+defaultValue) ⇒ <code>string</code>
    * [.hasDefaultValue()](#ServerVariable+hasDefaultValue) ⇒ <code>boolean</code>
    * [.description()](#ServerVariable+description) ⇒ <code>string</code>
    * [.examples()](#ServerVariable+examples) ⇒ <code>Array.&lt;string&gt;</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="ServerVariable+allowedValues"></a>

### serverVariable.allowedValues() ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="ServerVariable+allows"></a>

### serverVariable.allows(name) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the variable. |

<a name="ServerVariable+hasAllowedValues"></a>

### serverVariable.hasAllowedValues() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="ServerVariable+defaultValue"></a>

### serverVariable.defaultValue() ⇒ <code>string</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="ServerVariable+hasDefaultValue"></a>

### serverVariable.hasDefaultValue() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="ServerVariable+description"></a>

### serverVariable.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="ServerVariable+examples"></a>

### serverVariable.examples() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="Base+json"></a>

### serverVariable.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>ServerVariable</code>](#ServerVariable)  
<a name="Server"></a>

## Server ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a Server object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Server](#Server) ⇐ [<code>Base</code>](#Base)
    * [.description()](#Server+description) ⇒ <code>string</code>
    * [.url()](#Server+url) ⇒ <code>string</code>
    * [.protocol()](#Server+protocol) ⇒ <code>string</code>
    * [.protocolVersion()](#Server+protocolVersion) ⇒ <code>string</code>
    * [.variables()](#Server+variables) ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
    * [.variable(name)](#Server+variable) ⇒ [<code>ServerVariable</code>](#ServerVariable)
    * [.hasVariables()](#Server+hasVariables) ⇒ <code>boolean</code>
    * [.security()](#Server+security) ⇒ [<code>Array.&lt;ServerSecurityRequirement&gt;</code>](#ServerSecurityRequirement)
    * [.bindings()](#Server+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#Server+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Server+description"></a>

### server.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+url"></a>

### server.url() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+protocol"></a>

### server.protocol() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+protocolVersion"></a>

### server.protocolVersion() ⇒ <code>string</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+variables"></a>

### server.variables() ⇒ <code>Object.&lt;string, ServerVariable&gt;</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+variable"></a>

### server.variable(name) ⇒ [<code>ServerVariable</code>](#ServerVariable)
**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the server variable. |

<a name="Server+hasVariables"></a>

### server.hasVariables() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+security"></a>

### server.security() ⇒ [<code>Array.&lt;ServerSecurityRequirement&gt;</code>](#ServerSecurityRequirement)
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+bindings"></a>

### server.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Server+binding"></a>

### server.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### server.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="SubscribeOperation"></a>

## SubscribeOperation ⇐ [<code>Operation</code>](#Operation)
Implements functions to deal with a SubscribeOperation object.

**Kind**: global class  
**Extends**: [<code>Operation</code>](#Operation)  

* [SubscribeOperation](#SubscribeOperation) ⇐ [<code>Operation</code>](#Operation)
    * [.isPublish()](#SubscribeOperation+isPublish) ⇒ <code>boolean</code>
    * [.isSubscribe()](#SubscribeOperation+isSubscribe) ⇒ <code>boolean</code>
    * [.kind()](#SubscribeOperation+kind) ⇒ <code>string</code>
    * [.hasMultipleMessages()](#Operation+hasMultipleMessages) ⇒ <code>boolean</code>
    * [.messages()](#Operation+messages) ⇒ [<code>Array.&lt;Message&gt;</code>](#Message)
    * [.message()](#Operation+message) ⇒ [<code>Message</code>](#Message)
    * [.id()](#OperationTraitable+id) ⇒ <code>string</code>
    * [.summary()](#OperationTraitable+summary) ⇒ <code>string</code>
    * [.description()](#OperationTraitable+description) ⇒ <code>string</code>
    * [.hasTags()](#OperationTraitable+hasTags) ⇒ <code>boolean</code>
    * [.tags()](#OperationTraitable+tags) ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
    * [.externalDocs()](#OperationTraitable+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.bindings()](#OperationTraitable+bindings) ⇒ <code>Object</code>
    * [.binding(name)](#OperationTraitable+binding) ⇒ <code>Object</code>
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="SubscribeOperation+isPublish"></a>

### subscribeOperation.isPublish() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="SubscribeOperation+isSubscribe"></a>

### subscribeOperation.isSubscribe() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="SubscribeOperation+kind"></a>

### subscribeOperation.kind() ⇒ <code>string</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="Operation+hasMultipleMessages"></a>

### subscribeOperation.hasMultipleMessages() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="Operation+messages"></a>

### subscribeOperation.messages() ⇒ [<code>Array.&lt;Message&gt;</code>](#Message)
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="Operation+message"></a>

### subscribeOperation.message() ⇒ [<code>Message</code>](#Message)
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+id"></a>

### subscribeOperation.id() ⇒ <code>string</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+summary"></a>

### subscribeOperation.summary() ⇒ <code>string</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+description"></a>

### subscribeOperation.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+hasTags"></a>

### subscribeOperation.hasTags() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+tags"></a>

### subscribeOperation.tags() ⇒ [<code>Array.&lt;Tag&gt;</code>](#Tag)
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+externalDocs"></a>

### subscribeOperation.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+bindings"></a>

### subscribeOperation.bindings() ⇒ <code>Object</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="OperationTraitable+binding"></a>

### subscribeOperation.binding(name) ⇒ <code>Object</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the binding. |

<a name="Base+json"></a>

### subscribeOperation.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>SubscribeOperation</code>](#SubscribeOperation)  
<a name="Tag"></a>

## Tag ⇐ [<code>Base</code>](#Base)
Implements functions to deal with a Tag object.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Tag](#Tag) ⇐ [<code>Base</code>](#Base)
    * [.name()](#Tag+name) ⇒ <code>string</code>
    * [.description()](#Tag+description) ⇒ <code>string</code>
    * [.externalDocs()](#Tag+externalDocs) ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
    * [.json()](#Base+json) ⇒ <code>Any</code>

<a name="Tag+name"></a>

### tag.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>Tag</code>](#Tag)  
<a name="Tag+description"></a>

### tag.description() ⇒ <code>string</code>
**Kind**: instance method of [<code>Tag</code>](#Tag)  
<a name="Tag+externalDocs"></a>

### tag.externalDocs() ⇒ [<code>ExternalDocs</code>](#ExternalDocs)
**Kind**: instance method of [<code>Tag</code>](#Tag)  
<a name="Base+json"></a>

### tag.json() ⇒ <code>Any</code>
**Kind**: instance method of [<code>Tag</code>](#Tag)  
