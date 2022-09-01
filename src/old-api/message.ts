import { MessageTrait } from './message-trait';
import { Schema } from './schema';

import type { v2 } from '../spec-types';

export class Message extends MessageTrait<v2.MessageObject> {
  uid() {
    return this.id() || this.name() || this.ext('x-parser-message-name') as string || Buffer.from(JSON.stringify(this._json)).toString('base64');
  }

  payload() {
    if (!this._json.payload) return null;
    return new Schema(this._json.payload);
  }

  traits() {
    const traits: v2.MessageTraitObject[] = this._json['x-parser-original-traits'] || this._json.traits;
    if (!traits) return [];
    return traits.map(t => new MessageTrait(t));
  }

  hasTraits() {
    return !!this._json['x-parser-original-traits'] || !!this._json.traits;
  }

  originalPayload() {
    return this._json['x-parser-original-payload'] || this.payload();
  }

  originalSchemaFormat() {
    return this._json['x-parser-original-schema-format'] as string || this.schemaFormat();
  }
}
