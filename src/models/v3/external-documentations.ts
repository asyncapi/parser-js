import { Collection } from '../collection';

import type { ExternalDocumentationsInterface } from '../external-documentations';
import type { ExternalDocumentationInterface } from '../external-documentation';

export class ExternalDocumentations extends Collection<ExternalDocumentationInterface> implements ExternalDocumentationsInterface {
  override get(id: string): ExternalDocumentationInterface | undefined {
    return this.collections.find(externalDocumentation => externalDocumentation.meta('componentId' as any) === id);
  }
}
