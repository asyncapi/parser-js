import { MessageTraits } from "./message-traits";
import { MessageTrait } from "./message-trait";
import { Schema } from './schema';

import type { MessageInterface } from "../message";
import type { SchemaInterface } from "../schema";

export class Message extends MessageTrait implements MessageInterface {
  hasPayload(): boolean {
    return !!this._json.payload;
  }
  
  payload(): SchemaInterface | undefined {
    if (!this._json.payload) return undefined;
    return this.createModel(Schema, this._json.payload, { pointer: `${this._meta.pointer}/payload` });
  }

  traits(): MessageTraits {
    return new MessageTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(MessageTrait, trait, { pointer: `${this._meta.pointer}/traits/${index}` })
      })
    );
  }
}
