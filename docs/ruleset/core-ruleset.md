# AsyncAPI Core Ruleset

The core ruleset, which validates the overall structure of the specification.

> **Note**
> These rules will apply to each version, starting with `2.0.0`.

## Rules

### asyncapi-is-asyncapi

The input must be a document with a supported version of AsyncAPI.

#### Good example

```yaml
asyncapi: 2.0.0
...
```

#### Bad example

```yaml
openapi: 3.1.0
...
```

```yaml
asyncapi: 2.1.37
...
```

### asyncapi-latest-version

Checking if the AsyncAPI document is using the latest version.

#### Good example

```yaml
asyncapi: 2.6.0
...
```

#### Bad example

```yaml
asyncapi: 2.5.0
...
```

### asyncapi-document-resolved

Checking if the AsyncAPI document has a valid resolved (with resolved references) structure based on the specification's JSON Schema.

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
```

### asyncapi-document-unresolved

Checking if the AsyncAPI document has a valid unresolved (with unresolved references) structure based on the specification's JSON Schema.

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
      $ref: '#/components/x-operations/someOperation'
components:
  'x-operations':
    someOperation: {}
```
