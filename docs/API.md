### All models (Base)
- `<base>.hasExtension(key)` : boolean (outcome of https://github.com/asyncapi/parser-js/blob/b06e44f519f31fcda11336eb6d84aaf1d4630366/lib/parser.js#L129)
- `<base>.extension(key)` : any (outcome of https://github.com/asyncapi/parser-js/blob/b06e44f519f31fcda11336eb6d84aaf1d4630366/lib/parser.js#L129)

### Root - AsyncAPIDocument
- `AsyncAPIDocument.applicationPublishableChannels()` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.applicationPublishableMessages()` : Message[]
- `AsyncAPIDocument.applicationPublishOperations()` : Operation[]
- `AsyncAPIDocument.applicationSubscribableChannels()` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.applicationSubscribableMessages()` : Message[]
- `AsyncAPIDocument.applicationSubscribeOperations()` : Operation[]
- `AsyncAPIDocument.clientPublishableChannels()` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.clientPublishableMessages()` : Message[]
- `AsyncAPIDocument.clientPublishOperations()` : Operation[]
- `AsyncAPIDocument.clientSubscribableChannels()` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.clientSubscribableMessages()` : Message[]
- `AsyncAPIDocument.clientSubscribeOperations()` : Operation[]
- `AsyncAPIDocument.messages(<message name>[])` : Message[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.hasChannels()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/template/asyncapi.js#L32)
- `AsyncAPIDocument.channels(<channel name>[])` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.operations(<operation id>[])` : Operation[]		
- `AsyncAPIDocument.hasContentType('<content type>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319))
- `AsyncAPIDocument.schemas()` : Schema[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.hasServers()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/template/asyncapi.js#L32)
- `AsyncAPIDocument.servers()` : Server[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.server('<server name>')` : Server (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.info()` : Info
- `AsyncAPIDocument.json()` : string (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `AsyncAPIDocument.securitySchemes()` : SecurityScheme[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
### Info
- `Info.title()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `Info.description()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Info.version()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `Info.termsOfService()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/template/asyncapi.js#L27)

### Server
- `Server.name()` : string
- `Server.protocol()` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Server.operations()` : Operation[]
- `Server.protocolVersion()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L27)
- `Server.description()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L28)
- `Server.variables()` : ServerVariable[] (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L37)
- `Server.security()` : ServerSecurity[] (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L38 and https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L73-L93)

### ServerVariable
- `ServerVariable.name()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js/#L49)
- `ServerVariable.hasDefaultValue()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js/#L49-L54)
- `ServerVariable.defaultValue()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js/#L49-L54)
- `ServerVariable.hasAllowedValues()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js/#L49-L54)
- `ServerVariable.allowedValues()` : any[] (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js/#L49-L54)
- `ServerVariable.description()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js/#L49-L54)

### ServerSecurity
- `ServerSecurity.securityScheme()` : SecurityScheme (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)
- `ServerSecurity.values()` : string[] (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)

### SecurityScheme
- `SecurityScheme.type()` : Types (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)
- `SecurityScheme.in()` : ApiKeyLocations (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)
- `SecurityScheme.name()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)
- `SecurityScheme.scheme()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)
- `SecurityScheme.bearerFormat()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Servers.js#L75-L80)

### Operation
- `Operation.id()` : string
- `Operation.summary()` : string
- `Operation.hasDescription()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L69-L71)
- `Operation.description()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L69-L71)
- `Operation.hasMultipleMessages()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L74)
- `Operation.messages()` : Message[]
- `Operation.channels()` : Channel[]
- `Operation.extension('<extension property>')` : any
- `Operation.binding('<binding protocol>')` : any
- `Operation.servers()` : Server[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `Operation.server('<server name>')` : Server (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `Operation.isClientSubscribing()` : boolean
- `Operation.isClientPublishing()` : boolean
- `Operation.isApplicationSubscribing()` : boolean
- `Operation.isApplicationPublishing()` : boolean
- `Operation.type()` : string - Returns either `ClientSubscribing`, `ClientPublishing`, `ApplicationSubscribing`, `ApplicationPublishing`

### Channel
- `Channel.path()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L26)
- `Channel.messages()` : Message[]
- `Channel.operations()` : Operation[]
- `Channel.hasDescription()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L28)
- `Channel.description()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Channel.extension('<extension property>')` : any (outcome of comment(s): [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Channel.binding('<binding protocol>')` : any (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Channel.hasParameters()` : boolean (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L34)
- `Channel.parameters()` : ChannelParameter[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961) and https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L34)

### ChannelParameter
- `ChannelParameter.name()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L47)
- `ChannelParameter.schema()` : Schema (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Channels.js#L48)

### Message
- `Message.summary()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L11)
- `Message.hasDescription()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L16)
- `Message.description()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L18)
- `Message.examples()` : Object<string, any>[] (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L65)
- `Message.hasTags()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L38)
- `Message.tags()` : Tag[] (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L41)
- `Message.headers()` : Schema (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Message.payload()` : Schema (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Message.channels()` : Channel[]
- `Message.operations()` : Operation[]
- `Message.extension('<extension property>')` : any
- `Message.binding('<binding protocol>')` : any
- `Message.contentType()` : string

### Tag
- `Tag.name()` : string (outcome of https://github.com/asyncapi/markdown-template/blob/master/components/Message.js#L52)
