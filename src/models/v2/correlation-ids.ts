import { Collection } from '../collection';

import type { CorrelationIdsInterface } from '../correlation-ids';
import type { CorrelationIdInterface } from '../correlation-id';

export class CorrelationIds extends Collection<CorrelationIdInterface> implements CorrelationIdsInterface {
  protected override __get(id: string): CorrelationIdInterface | undefined {
    return this.collections.find(correlationId => correlationId.meta('id' as any) === id);
  }
}
