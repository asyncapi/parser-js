# Intent-driven API
Starting from **Parser API v2**, the API follows an Intent-driven design approach, based on user intents rather than technical mechanics.

An **Intent** represents a user intention of performing an action that solves a clear use case. 

For example, `Buy five watermelons` is the intent for `Going to the fruit shop, grab five watermelons, go to the counter, pay with cash, put the watermelon in a bag, exit the shop`.

Base on this principle, we have built an API based on the intents of final users, hiding the complexity of the tasks (do not care about going to the fruit shop, we do that for you) and providing better usability.
We tried to cover most use cases; however, the API accepts new intents adding new intents at any moment.

## Design

Intents are wrapped in models. Models are spec-independent but based on AsyncAPI concepts that will always exist regardless of the specification version. 

The upsides of using this approach are:
- Better user experience. Intents are much simple to use and do not force users to know about all spec internals.
- Improves resiliency to breaking changes on the final user code. Most of the time, users will **only** need to upgrade to the latest version of the parser to be up-to-date with the latest spec.

All Parsers, no matters the language, should follow the Intent-driven Parser API. 
This API is versioned so Parser implementations can maintain their compatibility matrix.

### Models 

Some examples of models are:
- **AsyncAPI** is the root model. Most of the intents are here, so users don't need to navigate through the object hierarchy.
- **Message** represents a message in your message-driven architecture. They can relate to Operations and Channels, but the relationship is not mandatory. 
- **Channel** describes a `topic`/`channel` a Message is transmitted over by some Operation.
- **Operation** describes an action rather the Application or the Client performs. It links messages with channels.
- **Server** represents a Server in your message-driven architecture. Clients connect to servers.
- **Info** contains defined information about your Application.
- **Schema** is used for representing [JSON Schema Draft 7](https://json-schema.org/draft-07/json-schema-release-notes.html) objects.
- **Tag** contains metadata.
- **SecurityScheme** represents security specifications for servers.

## Development
To avoid polluting the API with intents that have no apparent use case or can be replaced by a call to another model, we have defined the following rule:

Intents at the root model (`AsyncAPI`) **SHOULD** never return properties of other models but instead answer questions, return the model itself or a collection of models.
