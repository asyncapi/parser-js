# AsyncAPI Recommended Ruleset

The recommended ruleset verifies good practices within AsyncAPI documents structure.

> **Note**
> These rules will apply to each version, starting from `2.0.0`.

## Rules

### asyncapi-id

AsyncAPI document should have an `id` field.

#### Good example

```yaml
asyncapi: 2.0.0
id: 'urn:some:id'
...
```

#### Bad example

```yaml
asyncapi: 2.0.0
...
```

### asyncapi-defaultContentType

AsyncAPI document should have a `defaultContentType` field.

#### Good example

```yaml
asyncapi: 2.0.0
defaultContentType: 'application/json'
...
```

#### Bad example

```yaml
asyncapi: 2.0.0
...
```

### asyncapi-info-description

Info `description` should be present and a non-empty string.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
  description: Description of awesome AsyncAPI document
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
```

### asyncapi-info-contact

Info object should have a `contact` object.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
  contact: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
```

### asyncapi-info-contact-properties

Contact object should have `name`, `url`, and `email` fields.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
  contact:
    name: API Support
    url: www.asyncapi.com/support
    email: support@asyncapi.com
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
  contact:
    name: API Support
```

### asyncapi-info-license

Info object should have a `license` object.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
  license: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
```

### asyncapi-info-license-url

License object should have a `url` field.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
  license:
    name: Apache 2.0
```

### asyncapi-servers

AsyncAPI document should have a non-empty `servers` object.

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
servers:
  development:
    url: development.gigantic-server.com
    description: Development server
    protocol: kafka
    protocolVersion: '1.0.0'
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
```

### asyncapi-unused-component

A potentially unused component has been detected in the AsyncAPI document.

> **Warning**
> This rule may identify false positives when linting a specification that acts as a library (a container storing reusable objects, leveraged by other specifications that reference those objects).

#### Good example

```yaml
asyncapi: 2.0.0
info:
  title: Valid AsyncAPI document
  version: 1.0
channels:
  user/signup:
    publish:
      message:
        $ref: '#/components/messages/user'
components:
  messages:
    user: {...}
```

#### Bad example

```yaml
asyncapi: 2.0.0
info:
  title: Invalid AsyncAPI document
  version: 1.0
channels:
  user/signup:
    publish:
      message: {...}
components:
  messages:
    unusedMessage: {...}
```
