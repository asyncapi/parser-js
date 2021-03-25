# Intents
As we see it we have two options/concepts we can follow in regards to how we structure intents.

1. **All intents under one roof** so everything flows through the root such as: `AsyncAPIDocument.extensionForChannelThatApplicationSubscribesTo('<channel name>', '<extension property>')`
  
2. **Wrap intents in models**, to provide an independent concepts that will always exist regardless of the specification. 
 
Reason why we suggest to go with option 2 is:
- It is more maintainable, we would end up with an incomprehensible amount of intents in the same class, not to mention the length of the name for them.
- When viewed from the tooling perspective these models would also make sense and make it iteratable.
- To be consistent, so we do not reject intents on unclear rules making it confusing to understand.

## Models 
These are following models which we have identified and suggest we stick to. 
- **Message**, because message can exist without operation, and channels. 
- **Channel**, the core model (almost) everything flows around
- **Server**, you have to connect to something
- **Info**, defined information about your document
- **Schema**, JSON Schema draft 7, leave as is and don't create intents for it.
- **SecurityScheme**, does not have any intents tied to it at the moment, since we don't have a directly use-case/example.

### Rules
To remove confusion on when something is a model and when it is not, where and when intents are added we have defined some rules for the models:
- Root level intents SHOULD never return properties of models but instead answer questions, return the model itself or a collection of models
  - Reason why root level does not return properties, is because we need to limit the number of nested intents. 
  - i.e. to avoid `AsyncAPIDocument.extensionForChannelThatApplicationSubscribesTo('<channel name>', '<extension property>')`
- Models contain intents to return properties, answer questions, return other model or a collection of models.
  - Reason behind this is to segregate intents by responsibility. 
- Models are entity objects and should not be value objects
  - So why are operation for example not an entity? Because we don't see the operation as needing an identity, it merely contains values we need associated with the Channel.

## Initial intents and models
These are the intents together with the model they belong to. **(HELP NEEDED)** implies that we are unsure about the naming of the intent, especially since we are not native speakers.

### Decisions

* We decided to introduce the `role` parameter for intents that have a common implementation based on the combination of what we currently call operation type (`publish/subscribe`) plus the context or point of view of the current role (`Application/Client`). The parameter is mandatory to always make the user specify their role and avoid any future breaking change where this supposed default could be changed. This approach introduces few benefits:
  * Reduces the number of methods that refer to similar operation-dependent intents. E.g.: 
    * All of the following:
      * `AsyncAPIDocument.channelsApplicationSubscribes()`
      * `AsyncAPIDocument.channelsClientSubscribes()`
    * Become:
      * `AsyncAPIDocument.channelsSubscribes('<role>')`
  * Makes tools that contemplate both roles easily specify the role via a param. E.g.:
    * https://github.com/asyncapi/java-spring-cloud-stream-template/blob/bfbb108f51b366ca7f7ed9f2df389cde40e380a0/filters/all.js#L460

### Parameters definitions

- `<role>` is either `application` or `client`.
- `<content type>` is a specific media type (e.g. `application/json`)
- `<server name>` is the name of the server.
- `<extension property>` is the specific extension property (e.g. `x-test`)
- `<binding protocol>` is the specific binding protocol (e.g. `AMQP`)
- `<binding property>` is a property within the binding protocol.

## Feedback

* Do you have any extra intents we should add (initially)?
    * Don't expect all intents to be included in the first iteration, you should "easily" see where other intents could be added. But remember this is just an initial version that shows the general approach. 
* Do you like the setup/dislike the setup? Why? What can be improved?
* Any intents that are completely off?
* Other things?
* Can you come up with a better naming format then `Channel.operationIdForSubscribingClient()`? 
