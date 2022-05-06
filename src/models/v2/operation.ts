import { Message } from "./message";
import { Messages } from "./messages";
import { OperationTraits } from "./operation-traits";
import { OperationTrait } from "./operation-trait";

import type { MessagesInterface } from "../messages";
import type { OperationInterface } from "../operation";
import type { OperationTraitsInterface } from "../operation-traits";

export class Operation extends OperationTrait implements OperationInterface {
  messages(): MessagesInterface {
    let isOneOf = false;
    let messages = this._json.message || [];
    if (Array.isArray(messages.oneOf)) {
      messages = messages.oneOf;
      isOneOf = true;
    } else if (!Array.isArray(messages)) {
      messages = [messages];
    }

    return new Messages(
      messages.map((message: any, index: number) => {
        return this.createModel(Message, message, { pointer: `${this._meta.pointer}/message${isOneOf ? `/oneOf/${index}` : ''}` })
      })
    );
  }

  traits(): OperationTraitsInterface {
    return new OperationTraits(
      (this._json.traits || []).map((trait: any, index: number) => {
        return this.createModel(OperationTrait, trait, { pointer: `${this._meta.pointer}/traits/${index}` })
      })
    );
  }
}
