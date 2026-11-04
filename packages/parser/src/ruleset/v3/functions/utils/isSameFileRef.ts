/**
 * Returns true when the unresolved document has a same-file `$ref` at `path`.
 *
 * Same-file references are already checked by the pointer-pattern rules
 * (`asyncapi3-required-*-unambiguity`), so the resolved rules skip them and only
 * report what those rules can't see: references that go through another file.
 */
export function isSameFileRef(data: unknown, path: Array<string | number>): boolean {
  let node: unknown = data;
  for (const segment of path) {
    if (node === null || typeof node !== 'object') return false;
    node = (node as Record<string | number, unknown>)[segment];
  }
  const ref = (node as { $ref?: unknown } | undefined)?.$ref;
  return typeof ref === 'string' && ref.startsWith('#');
}

/**
 * Returns true for a reference the resolver couldn't follow (it stays as `{ $ref }`).
 */
export function isUnresolvedRef(value: unknown): boolean {
  return value !== null && typeof value === 'object' && typeof (value as { $ref?: unknown }).$ref === 'string';
}
