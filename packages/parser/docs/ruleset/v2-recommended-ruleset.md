# AsyncAPI v2 Recommended Ruleset

The recommended ruleset verifies good practices within AsyncAPI version `2.x.x` documents.

> **Note**
> These rules will only apply to AsyncAPI `2.x.x` documents.

## Rules

### asyncapi2-tags

AsyncAPI document should have a non-empty `tags` array.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
tags:
  - e-commerce
servers: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
```

### asyncapi2-server-no-empty-variable

Server URL variable declarations cannot be empty (e.g., `gigantic-server.com/{}` is invalid).

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.{variable}.mosquitto.org
    variables:
      variable: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.{}.mosquitto.org
```

### asyncapi2-server-no-trailing-slash

Server URL should not have a trailing slash.

Some tooling forgets to strip trailing slashes off when it's joining the `$.servers.[*].url` with channels, and you can get awkward URLs like `mqtt://example.com/broker//pets`. Best to just strip them off yourself.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: example.com/broker
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers:
  production:
    url: example.com/broker/
```

### asyncapi2-channel-no-empty-parameter

Channel parameter declarations cannot be empty (e.g., `./given/{}` is invalid).

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
channels:
  users/{userId}/signedUp: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
channels:
  users/{}/signedUp: {...}
```

### asyncapi2-channel-no-query-nor-fragment

Query parameters and fragments shouldn't be used in channel names. Instead, use bindings to define them.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
channels:
  users/{userId}/signedUp: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
channels:
  users/{userId}/signedOut?query={...}: {...}
  users/{userId}/signedOut#hash: {...}
```

### asyncapi2-channel-no-trailing-slash

Keep trailing slashes off of channel names, as it can cause some confusion. Most messaging protocols will treat `example/foo` and `example/foo/` as different things. Keep in mind that tooling may replace slashes (`/`) with protocol-specific notation (e.g.: `.` for AMQP), therefore, a trailing slash may result in an invalid channel name in some protocols.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
channels:
  users/{userId}/signedUp: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
channels:
  users/{userId}/signedUp/: {...}
```

### asyncapi2-operation-operationId

The `operationId` should be defined in each operation, essentially as an operation reference. Tools may use `operationId` for defining function names, class method names, and even URL hashes in documentation systems.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.on:
    publish:
      operationId: turnOn
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.off:
    publish:
      operationId: turnOff
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.on:
    publish:
      operationId: turn
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.off:
    publish: {...} # without `operationId`
```

### asyncapi2-message-messageId

The `messageId` should be defined in each message, essentially a message reference. Tools may use `messageId` for defining function names, class method names, and even URL hashes in documentation systems.

#### Good example

```yaml
asyncapi: 2.4.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.on:
    publish:
      message:
        messageId: turnOnMessage
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.off:
    publish:
      message:
        messageId: turnOffMessage
```

#### Bad example

```yaml
asyncapi: 2.4.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.on:
    publish:
      message:
        messageId: turnMessage
  smartylighting.streetlights.1.0.action.{streetlightId}.turn.off:
    publish:
      message: {...} # without `messageId`
```

### asyncapi2-unused-securityScheme

A potentially unused security scheme has been detected in the AsyncAPI document.

> **Warning**
> This rule may identify false positives when linting a specification that acts as a library (a container storing reusable objects, leveraged by other specifications that reference those objects).

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.mosquitto.org
    protocol: mqtt
    security:
      - usedSchema: []
channels:
  ...
components:
  securitySchemas:
    usedSchema: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.mosquitto.org
    protocol: mqtt
channels:
  ...
components:
  securitySchemas:
    unusedSchema: {...}
```
