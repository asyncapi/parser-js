import { Collection } from './collection';

import type { ExternalDocumentationInterface } from './external-documentation';

export type ExternalDocumentationsInterface = Collection<ExternalDocumentationInterface>

export class ExternalDocumentations extends Collection<ExternalDocumentationInterface> implements ExternalDocumentationsInterface {
  override get(id: string): ExternalDocumentationInterface | undefined {
    return this.collections.find(externalDocs => externalDocs.meta('id' as any) === id);
  }
}