import { OperationTrait } from './operation-trait';
import { Message } from './message';

import type { v2 } from '../spec-types';

export class Operation extends OperationTrait<v2.OperationObject> {
  traits() {
    const traits: v2.OperationTraitObject[] = this._json['x-parser-original-traits'] || this._json.traits;
    if (!traits) return [];
    return traits.map(t => new OperationTrait(t));
  }

  hasTraits() {
    return !!this._json['x-parser-original-traits'] || !!this._json.traits;
  }

  hasMultipleMessages() {
    const message = this._json.message as v2.MessageObject | { oneOf: v2.MessageObject[] };
    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
    if (message && (message as { oneOf: v2.MessageObject[] }).oneOf && (message as { oneOf: v2.MessageObject[] }).oneOf.length > 1) return true;
    return false;
  }

  messages() {
    const message = this._json.message as { oneOf: v2.MessageObject[] };
    if (!message) return [];
    if (message.oneOf) return message.oneOf.map(m => new Message(m));
    return [new Message(message)];
  }

  message(index?: number | string) {
    const message = this._json.message as v2.MessageObject | { oneOf: v2.MessageObject[] };
    if (!message) return null;
    if ((message as { oneOf: v2.MessageObject[] }).oneOf && (message as { oneOf: v2.MessageObject[] }).oneOf.length === 1) return new Message((message as { oneOf: v2.MessageObject[] }).oneOf[0]);
    if (!(message as { oneOf: v2.MessageObject[] }).oneOf) return new Message(message);
    if (typeof index !== 'number') return null;
    if (index > (message as { oneOf: v2.MessageObject[] }).oneOf.length - 1) return null;
    return new Message((message as { oneOf: v2.MessageObject[] }).oneOf[+index]);
  }
}
