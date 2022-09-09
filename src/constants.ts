import specs from '@asyncapi/specs/supported';

export const xParserSpecParsed = 'x-parser-spec-parsed';
export const xParserSpecStringified = 'x-parser-spec-stringified';

export const xParserMessageName = 'x-parser-message-name';
export const xParserSchemaId = 'x-parser-schema-id';

export const xParserOriginalSchemaFormat = 'x-parser-original-schema-format';
export const xParserOriginalPayload = 'x-parser-original-payload';
export const xParserOriginalTraits = 'x-parser-original-traits';

export const xParserCircular = 'x-parser-circular';
export const xParserCircularProps = 'x-parser-circular-props';

export const EXTENSION_REGEX = /^x-[\w\d.\-_]+$/;

export const specVersions = Object.keys(specs);
export const lastVersion = specVersions[specVersions.length - 1];
