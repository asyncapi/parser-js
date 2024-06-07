import { MessageTrait } from './message-trait';
import { Schema } from './schema';

import { xParserMessageName, xParserOriginalTraits, xParserOriginalPayload, xParserOriginalSchemaFormat } from '../constants';

import type { v2 } from '../spec-types';

export class Message extends MessageTrait<v2.MessageObject> {
  uid() {
    return this.id() || this.name() || this.ext(xParserMessageName) as string;
  }

  payload() {
    if (!this._json.payload) return null;
    return new Schema(this._json.payload);
  }

  traits() {
    const traits: v2.MessageTraitObject[] = this.ext(xParserOriginalTraits) || this._json.traits;
    if (!traits) return [];
    return traits.map(t => new MessageTrait(t));
  }

  hasTraits() {
    return !!this.ext(xParserOriginalTraits) || !!this._json.traits;
  }

  originalPayload() {
    return this.ext(xParserOriginalPayload) || this.payload();
  }

  originalSchemaFormat() {
    return this.ext(xParserOriginalSchemaFormat) as string || this.schemaFormat();
  }
}
