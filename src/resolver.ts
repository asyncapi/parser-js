import { Resolver as SpectralResolver } from '@stoplight/json-ref-resolver';
import { resolveFile, resolveHttp } from '@stoplight/json-ref-readers';

export interface Resolver {
  order?: number;
  canRead?: boolean | ((input: ResolverInput) => boolean); 
  read: (input: ResolverInput) => string | Buffer | Promise<string | Buffer>;
}

export interface ResolverInput {
  url: string;
  extension: string;
}

interface ResolverOptions {
  resolvers: Array<Resolver>;
}

export function createResolver(options?: ResolverOptions): SpectralResolver {
  return new SpectralResolver({
    resolvers: {
      https: { resolve: resolveHttp },
      http: { resolve: resolveHttp },
      file: { resolve: resolveFile },
    },
  });
}

export function createFileResolver() {

}

export function createHttpResolver() {
  
}
