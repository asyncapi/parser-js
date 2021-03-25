
### Root - AsyncAPIDocument
- `AsyncAPIDocument.hasContentType('<content type>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319))
- `AsyncAPIDocument.channels()` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- **(HELP NEEDED)** `AsyncAPIDocument.channelsSubscribes('<role>')` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- **(HELP NEEDED)** `AsyncAPIDocument.channelsPublishes('<role>')` : Channel[] (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- **(HELP NEEDED)** `AsyncAPIDocument.isSubscribingToChannels('<role>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319))
- **(HELP NEEDED)** `AsyncAPIDocument.isPublishingToChannels('<role>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319))
- `AsyncAPIDocument.messages()` : Message[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.schemas()` : Schema[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.servers()` : Server[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.server('<server name>')` : Server (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- `AsyncAPIDocument.json()` : string (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `AsyncAPIDocument.securitySchemes()` : SecurityScheme[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))

### Info
- `Info.title()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))
- `Info.description()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Info.version()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407), [800963792](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800963792))

### Server
- `Server.name()` : string
- `Server.protocol()` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))

### SecurityScheme
Empty for now.

### Channel
- `Channel.path()` : string
- `Channel.messages()` : Message[]
- **(HELP NEEDED)** `Channel.messagesPublishes('<role>')` : Message[]
- **(HELP NEEDED)** `Channel.messagesSubscribes('<role>')` : Message[]
- `Channel.isSubscribing('<role>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Channel.isPublishing('<role>')` : boolean (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Channel.description()` : string (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Channel.extension('<extension property>')` : any (outcome of comment(s): [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
-  **(HELP NEEDED)** `Channel.extensionForPublishing('<role>', '<extension property>')` : any (outcome of comment(s): [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
-  **(HELP NEEDED)** `Channel.extensionForSubscribing('<role>', '<extension property>')` : any (outcome of comment(s): [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- `Channel.binding('<binding protocol>', '<binding property>')` : any (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
-  **(HELP NEEDED)** `Channel.bindingForSubscribing('<role>', '<binding protocol>', '<binding property>')` : any (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
-  **(HELP NEEDED)** `Channel.bindingForPublishing('<role>', <binding protocol>', '<binding property>')` : any (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))
- **(HELP NEEDED)** `Channel.summaryForPublishing('<role>')` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- **(HELP NEEDED)** `Channel.summaryForSubscribing('<role>')` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Channel.parameters()` : Schema[] (outcome of comment(s): [800935961](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800935961))
- **(HELP NEEDED)** `Channel.operationIdForPublishing('<role>')` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- **(HELP NEEDED)** `Channel.operationIdForSubscribing('<role>')` : string (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))

### Message
- `Message.headers()` : Schema (outcome of comment(s): [800282407](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-800282407))
- `Message.payload()` : Schema (outcome of comment(s): [799481319](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799481319), [799598596](https://github.com/asyncapi/shape-up-process/issues/84#issuecomment-799598596))