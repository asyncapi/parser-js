
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
- `AsyncAPIDocument.channels(<channel name>[])` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.operations(<operation id>[])` : Operation[]		
- `AsyncAPIDocument.hasContentType('<content type>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319))
- `AsyncAPIDocument.schemas()` : Schema[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.servers()` : Server[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.server('<server name>')` : Server (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.info()` : Info
- `AsyncAPIDocument.json()` : string (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `AsyncAPIDocument.securitySchemes()` : SecurityScheme[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
### Info
- `Info.title()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `Info.description()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Info.version()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))

### Server
- `Server.name()` : string
- `Server.protocol()` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Server.operations()` : Operation[]

### SecurityScheme
Empty for now.

### Operation
- `Operation.id()` : string
- `Operation.summary()` : string
- `Operation.messages()` : Message[]
- `Operation.channels()` : Channel[]
- `Operation.extension('<extension property>')` : any
- `Operation.binding('<binding protocol>', '<binding property>')` : any
- `Operation.servers()` : Server[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `Operation.server('<server name>')` : Server (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `Operation.isClientSubscribing()` : boolean
- `Operation.isClientPublishing()` : boolean
- `Operation.isApplicationSubscribing()` : boolean
- `Operation.isApplicationPublishing()` : boolean
- `Operation.type()` : string - Returns either `ClientSubscribing`, `ClientPublishing`, `ApplicationSubscribing`, `ApplicationPublishing`
### Channel
- `Channel.path()` : string
- `Channel.messages()` : Message[]
- `Channel.operations()` : Operation[]
- `Channel.description()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Channel.extension('<extension property>')` : any (outcome of comment(s): [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Channel.binding('<binding protocol>', '<binding property>')` : any (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Channel.parameters()` : Schema[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))

### Message
- `Message.headers()` : Schema (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Message.payload()` : Schema (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Message.channels()` : Channel[]
- `Message.operations()` : Operation[]
- `Message.extension('<extension property>')` : any
- `Message.binding('<binding protocol>', '<binding property>')` : any
- `Message.contentType()` : string