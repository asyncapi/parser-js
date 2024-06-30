# Migrating from v2 to v3

The ONLY thing that changes between v2 and v3 is that we now use [parser API v3](https://github.com/asyncapi/parser-api/commit/954a59e41ccdb70de51eb43901f61b79198fbb51) where v2 used [parser API v1](https://github.com/asyncapi/parser-api/commit/7dab1eeb796f8c8c079e5d0c4d671d55a60bc8ca).

## Parser API v1 to v3 
There are only very few changes, for message and message traits.

## Message

```diff
- - messageId(): `string` | `undefined`
- - schemaFormat(): `string`
+ - schemaFormat(): `string` | `undefined`
```

Since `messageId` have been removed, you need to use `id` instead.

## MessageTrait

```diff
- - messageId(): `string` | `undefined`
- - schemaFormat(): `string`
+ - schemaFormat(): `string` | `undefined`
```

Since `messageId` have been removed, you need to use `id` instead.
