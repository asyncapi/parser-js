import { isPlainObject } from '@stoplight/json';

export type MaybeHaveTraits = { traits?: any[] } & Record<string, unknown>;

export function mergeTraits<T extends MaybeHaveTraits>(data: T): T {
  if (Array.isArray(data.traits)) {
    data = { ...data }; // shallow copy
    for (const trait of data.traits as T[]) {
      for (const key in trait) {
        data[key] = merge(data[key], trait[key]);
      }
    }
  }
  return data;
}

function merge<T>(origin: unknown, patch: unknown): T {
  // If the patch is not an object, it replaces the origin.
  if (!isPlainObject(patch)) {
    return patch as T;
  }

  const result = !isPlainObject(origin)
    ? {} // Non objects are being replaced.
    : Object.assign({}, origin); // Make sure we never modify the origin.

  Object.keys(patch).forEach(key => {
    const patchVal = patch[key];
    if (patchVal === null) {
      delete result[key];
    } else {
      result[key] = merge(result[key], patchVal);
    }
  });
  return result as T;
}
