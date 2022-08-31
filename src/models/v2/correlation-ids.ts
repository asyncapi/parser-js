import { Collection } from '../collection';

import type { CorrelationIdsInterface } from '../correlation-ids';
import type { CorrelationIdInterface } from '../correlation-id';

export class CorrelationIds extends Collection<CorrelationIdInterface> implements CorrelationIdsInterface {
  override get(id: string): CorrelationIdInterface | undefined {
    return this.collections.find(correlationId => correlationId.meta()["key"] === id);
  }

  override has(id: string): boolean {
    return this.collections.some(correlationId => correlationId.meta()["key"] === id);
  }
}
