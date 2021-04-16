# Intents

The intents are wrapped in models, to provide independent concepts that will always exist regardless of the specification. The upsides to using this approach is:
- More maintainable.
- When viewed from the tooling perspective these models would also make sense and make it iteratable.
- To be consistent, so we do not reject intents on unclear rules making it confusing to understand.

## Models 
These are the intent models added to the parser
- **AsyncAPI**, the root of the structure.
- **Message**, because message can exist without operation, and channels. 
- **Channel**, describing a `topic`/`channel` message is transmitted over by some operation.
- **Operation**, describes the action to take on a channel with a message.
- **Server**, you have to connect to something
- **Info**, defined information about your application.
- **Schema**, JSON Schema draft 7, left as is and don't have intents.
- **Tag**, meta data.
- **SecurityScheme**, for security specifications needed.

### Rules
To remove confusion on when something is a model and when it is not, where and when intents are added we have defined some rules:
- Root level intents (`AsyncAPI` model) SHOULD never return properties of models but instead answer questions, return the model itself or a collection of models
  - Reason why root level does not return properties, is because we need to limit the number of nested intents. 
  - i.e. to avoid `AsyncAPIDocument.extensionForChannelThatApplicationSubscribesTo('<channel name>', '<extension property>')`
- Models contain intents to return properties, answer questions, return other model or a collection of models.
  - Reason behind this is to segregate intents by responsibility. 
- Models are entity objects and should not be value objects
  - Does it make sense conceptually independently from the spec? 
