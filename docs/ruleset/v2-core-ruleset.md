# AsyncAPI v2 Core Ruleset

The core ruleset, which validates the overall structure of the `2.x.x` specifications.

> **Note**
> These rules will only apply to AsyncAPI `2.x.x` documents.

## Rules

### asyncapi2-server-security

Server `security` values must match a scheme defined in the `$.components.securitySchemes` object. It also checks if there are `oauth2` scopes that have been defined for the given security.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.mosquitto.org
    security:
      - authKey: []
components:
  securitySchemes:
    authKey: {...}
```

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.mosquitto.org
    security:
      - oauth2: ['write:user', 'read:user']
components:
  securitySchemes:
    oauth2:
      flows:
        implicit:
          scopes:
            'write:user': '...',
            'read:user': '...',
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
    security:
      - notDefined: []
components:
  securitySchemes:
    authKey: {...}
```

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.mosquitto.org
    security:
      - oauth2: ['write:user', 'not:defined']
components:
  securitySchemes:
    oauth2:
      flows:
        implicit:
          scopes:
            'write:user': '...',
            'read:user': '...',
```

### asyncapi2-server-variables

All server URL variables should be defined in the `variables` object of the server. They should also not contain redundant variables that do not exist in the server address.

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
    url: test.{variable}.mosquitto.org
```

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.{variable}.mosquitto.org
    variables:
      variable: {...}
      redundantVariable: {...}
```

### asyncapi2-channel-parameters

All channel parameters should be defined in the `parameters` object of the channel. They should also not contain redundant parameters that do not exist in the channel address.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
channels: 
  'users/{userId}/signedUp':
    parameters:
      userId: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
channels: 
  'users/{userId}/signedUp': {}
```

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
channels: 
  'users/{userId}/signedUp':
    parameters:
      userId: {...}
      redundantParameter: {...}
```

### asyncapi2-channel-servers

Channel servers must be defined in the `servers` object.

#### Good example

```yaml
asyncapi: 2.2.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.{variable}.mosquitto.org
    variables:
      variable: {...}
channels:
  users/signedUp:
    servers:
      - production
```

#### Bad example

```yaml
asyncapi: 2.2.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers:
  production:
    url: test.{variable}.mosquitto.org
    variables:
      variable: {...}
channels:
  users/signedUp:
    servers:
      - development
```

### asyncapi2-operation-operationId-uniqueness

`operationId` must be unique across all the operations (except the ones defined in the components).

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
    publish:
      operationId: turn
```

### asyncapi2-operation-security

Operation `security` values must match a scheme defined in the `$.components.securitySchemes` object. It also checks if there are `oauth2` scopes that have been defined for the given security.

#### Good example

```yaml
asyncapi: 2.4.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      security:
        - authKey: []
components:
  securitySchemes:
    authKey: {...}
```

```yaml
asyncapi: 2.4.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      security:
        - oauth2: ['write:user', 'read:user']
components:
  securitySchemes:
    oauth2:
      flows:
        implicit:
          scopes:
            'write:user': '...',
            'read:user': '...',
```

#### Bad example

```yaml
asyncapi: 2.4.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      security:
        - notDefined: []
components:
  securitySchemes:
    authKey: {...}
```

```yaml
asyncapi: 2.4.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      security:
      - oauth2: ['write:user', 'not:defined']
components:
  securitySchemes:
    oauth2:
      flows:
        implicit:
          scopes:
            'write:user': '...',
            'read:user': '...',
```

### asyncapi2-message-examples

All examples in message object should follow `payload` and `headers` schemas.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
components:
  messages:
    someMessage:
      payload:
        type: string
      headers:
        type: object
      examples:
        - payload: foobar
          headers:
            someHeader: someValue
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
components:
  messages:
    someMessage:
      payload:
        type: string
      headers:
        type: object
      examples:
        - payload: 2137
          headers: someHeader
```

### asyncapi2-message-messageId-uniqueness

`messageId` must be unique across all the messages (except those one defined in the components).

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
      message:
        messageId: turnMessage
```

### asyncapi2-tags-uniqueness

Tags must not have duplicate names (identifiers).

#### Good example

```yaml
tags:
  - name: "env:production"
  - name: "e-commerce"
```

#### Bad example

```yaml
tags:
  - name: "e-commerce"
  - name: "e-commerce"
```

### asyncapi2-schemas

Custom schema must be correctly formatted from the point of view of the used format.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        payload:
          type: object
```

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        schemaFormat: 'application/vnd.aai.asyncapi;version=2.0.0',
        payload:
          type: object
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        payload:
          oneOf: 'this should be an array'
          properties:
            name:
              if: 'this should be an if'
```

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        schemaFormat: 'notExisting',
        payload:
          type: object
```

### asyncapi2-schema-default

`default` objects should be valid against the schema they decorate.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        payload:
          type: string
          default: 'foobar'
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        payload:
          type: string
          default: 2137
```

### asyncapi2-schema-examples

Values of the `examples` array should be valid against the schema they decorate.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        payload:
          type: string
          examples: ['foobar']
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
servers: {...}
channels:
  "user/signup":
    publish:
      message:
        payload:
          type: string
          examples: ['foobar', 2137]
```
