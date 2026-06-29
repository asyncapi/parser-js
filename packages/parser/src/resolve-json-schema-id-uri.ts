/**
 * Resolves JSON Schema `$ref` URIs against `$id` base URIs.
 * 
 * Per JSON Schema draft-07 (Section 8.2), the `$id` keyword defines a URI for
 * the schema and the base URI that other URI references within the schema are
 * resolved against. A subschema's `$id` is resolved against the base URI of
 * its parent schema.
 * 
 * The underlying reference resolver (`@stoplight/json-ref-resolver`) does not
 * follow this JSON Schema specification behavior. This module pre-processes
 * the document to rewrite `$ref` values so they resolve correctly.
 * 
 * @see https://github.com/asyncapi/parser-js/issues/403
 * @see https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01#section-8.2
 */

/**
 * Resolves a relative URI against a base URI, following RFC 3986 semantics.
 */
function resolveUri(base: string, ref: string): string {
  // If the ref is already an absolute URI, return as-is
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(ref)) {
    return ref;
  }

  // If the ref starts with '#', it's a fragment-only reference — local to the document, not affected by $id
  if (ref.startsWith('#')) {
    return ref;
  }

  try {
    // Use URL constructor for proper RFC 3986 resolution
    const resolved = new URL(ref, base);
    return resolved.href;
  } catch {
    // If URL construction fails, return the original ref unchanged
    return ref;
  }
}

/**
 * Checks whether a given `$id` value is an absolute URI (has a scheme).
 */
function isAbsoluteUri(uri: string): boolean {
  return /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(uri);
}

/**
 * Checks whether a given `$ref` value is a relative URI that should be
 * resolved against a `$id` base URI. Fragment-only refs (starting with '#')
 * and already-absolute refs are excluded.
 */
function isRelativeRef(ref: string): boolean {
  // Fragment-only references are resolved within the document, not via $id
  if (ref.startsWith('#')) {
    return false;
  }
  // Already absolute URIs don't need resolution
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(ref)) {
    return false;
  }
  return true;
}

/**
 * Recursively walks through a schema object, tracking `$id` base URIs,
 * and rewrites relative `$ref` values to resolve against the closest
 * ancestor `$id` base URI.
 */
function walkAndResolveRefs(schema: any, baseUri: string, visited: Set<any>): void {
  if (typeof schema !== 'object' || schema === null || visited.has(schema)) {
    return;
  }
  visited.add(schema);

  // Determine the current base URI: if this schema has an `$id`, resolve it
  // against the parent's base URI to get the new base.
  let currentBase = baseUri;
  if (typeof schema.$id === 'string' && schema.$id.length > 0) {
    if (isAbsoluteUri(schema.$id)) {
      currentBase = schema.$id;
    } else if (baseUri) {
      // Relative $id: resolve against parent base
      try {
        currentBase = new URL(schema.$id, baseUri).href;
      } catch {
        // If resolution fails, keep the parent base
      }
    }
  }

  // If this schema has a `$ref` and the ref is relative, resolve it
  // against the current base URI.
  if (typeof schema.$ref === 'string' && currentBase && isRelativeRef(schema.$ref)) {
    schema.$ref = resolveUri(currentBase, schema.$ref);
  }

  // Recurse into all object properties and array items
  for (const key of Object.keys(schema)) {
    if (key === '$id' || key === '$ref') {
      continue;
    }
    const value = schema[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          walkAndResolveRefs(item, currentBase, visited);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      walkAndResolveRefs(value, currentBase, visited);
    }
  }
}

/**
 * Pre-processes an AsyncAPI document (as a parsed JS object) to resolve
 * `$ref` URIs within schemas that use `$id` to set a base URI.
 * 
 * This function mutates the input object in-place.
 * 
 * @param document - The parsed AsyncAPI document object.
 * @returns The same object, with `$ref` values rewritten where needed.
 */
export function resolveJsonSchemaIdUri(document: Record<string, any>): Record<string, any> {
  if (typeof document !== 'object' || document === null) {
    return document;
  }

  const visited = new Set<any>();
  // Walk the entire document. The base URI starts empty — only schemas
  // that declare `$id` with an absolute URI will trigger rewriting.
  walkAndResolveRefs(document, '', visited);
  return document;
}
