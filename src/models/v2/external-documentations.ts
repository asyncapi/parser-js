import { Collection } from '../collection';

import type { ExternalDocumentationsInterface } from '../external-documentations';
import type { ExternalDocumentationInterface } from '../external-documentation';

export class ExternalDocumentations extends Collection<ExternalDocumentationInterface> implements ExternalDocumentationsInterface {
  override get(_: string): ExternalDocumentationInterface | undefined {
    return;
  }
}
