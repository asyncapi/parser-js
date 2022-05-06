import { Collection } from '../collection';

import type { MessageExamplesInterface } from '../message-examples';
import type { MessageExampleInterface } from '../message-example';

export class MessageExamples extends Collection<MessageExampleInterface> implements MessageExamplesInterface {
  override get(name: string): MessageExampleInterface | undefined {
    return this.collections.find(trait => trait.name() === name);
  }

  override has(name: string): boolean {
    return this.collections.some(trait => trait.name() === name);
  }
}
