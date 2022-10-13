import { Collection } from './collection';
import type { CorrelationIdInterface } from './correlation-id';

export type CorrelationIdsInterface = Collection<CorrelationIdInterface>

export class CorrelationIds extends Collection<CorrelationIdInterface> implements CorrelationIdsInterface {
  override get(id: string): CorrelationIdInterface | undefined {
    return this.collections.find(correlationId => correlationId.meta('id' as any) === id);
  }
}
