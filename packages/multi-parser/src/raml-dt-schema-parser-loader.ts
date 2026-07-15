// `@asyncapi/raml-dt-schema-parser` is an optional peer dependency. The upstream
// repository was archived (2025-08-04) and its transitive chain ships several
// CVEs, so consumers must opt in by installing it themselves.
export function loadRamlDTSchemaParser(): (() => any) | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, global-require
    return require('@asyncapi/raml-dt-schema-parser').RamlDTSchemaParser;
  } catch {
    return null;
  }
}
