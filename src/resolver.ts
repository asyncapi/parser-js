import { Resolver as SpectralResolver } from '@stoplight/spectral-ref-resolver';
import { resolveFile, resolveHttp } from '@stoplight/json-ref-readers';

import type Uri from 'urijs';

export interface Resolver {
  schema: 'file' | 'http' | 'https' | string;
  order?: number;
  canRead?: boolean | ((uri: Uri, ctx?: any) => boolean); 
  read: (uri: Uri, ctx?: any) => string | undefined | Promise<string | undefined>;
}

export interface ResolverOptions {
  resolvers?: Array<Resolver>;
}

export function createResolver(options: ResolverOptions = {}): SpectralResolver {
  const availableResolvers: Array<Resolver> = [
    ...createDefaultResolvers(),
    ...(options?.resolvers || [])
  ].map(r => ({ 
    ...r,
    order: r.order || Number.MAX_SAFE_INTEGER,
    canRead: typeof r.canRead === 'undefined' ? true: r.canRead, 
  }));
  const availableSchemas = [...new Set(availableResolvers.map(r => r.schema))];
  const resolvers = availableSchemas.reduce((acc, schema) => {
    acc[schema] = { resolve: createSchemaResolver(schema, availableResolvers) };
    return acc;
  }, {} as Record<string, { resolve: (uri: Uri, ctx?: any) => string | Promise<string> }>);

  return new SpectralResolver({
    resolvers: resolvers as any,
  });
}

function createDefaultResolvers(): Array<Resolver> {
  return [
    {
      schema: 'file',
      read: resolveFile as (input: Uri, ctx?: any) => string | Promise<string>,
    },
    {
      schema: 'https',
      read: resolveHttp as (input: Uri, ctx?: any) => string | Promise<string>,
    },
    {
      schema: 'http',
      read: resolveHttp as (input: Uri, ctx?: any) => string | Promise<string>,
    },
  ]
}

function createSchemaResolver(schema: string, allResolvers: Array<Resolver>): (uri: Uri, ctx?: any) => string | Promise<string> {
  const resolvers = allResolvers.filter(r => r.schema === schema).sort((a, b) => { return (a.order as number) - (b.order as number); });
  return async (uri, ctx) => {
    let result: string | undefined = undefined;
    let lastError: Error | undefined;
    for (const resolver of resolvers) {
      try {
        if (!canRead(resolver, uri, ctx)) continue;

        result = await resolver.read(uri, ctx);
        if (typeof result === 'string') {
          break;
        }
      } catch(e: any) {
        lastError = e;
        continue;
      }
    }
    if (typeof result !== 'string') {
      throw lastError || new Error(`None of the available resolvers for "${schema}" can resolve the given reference.`);
    }
    return result;
  }
}

function canRead(resolver: Resolver, uri: Uri, ctx?: any) {
  return typeof resolver.canRead === 'function' ? resolver.canRead(uri, ctx) : resolver.canRead;
}
