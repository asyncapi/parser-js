import { Collection } from './collection';
import type { MessageExampleInterface } from './message-example';

export type MessageExamplesInterface = Collection<MessageExampleInterface>

export class MessageExamples extends Collection<MessageExampleInterface> implements MessageExamplesInterface {
  override get(name: string): MessageExampleInterface | undefined {
    return this.collections.find(example => example.name() === name);
  }
}
