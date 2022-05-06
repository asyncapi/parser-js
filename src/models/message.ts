import type { BaseModel } from "./base";
import type { MessageTraitsInterface } from "./message-traits";
import type { MessageTraitInterface } from "./message-trait";
import type { SchemaInterface } from "./schema";

export interface MessageInterface extends BaseModel, MessageTraitInterface {
  hasPayload(): boolean;
  payload(): SchemaInterface | undefined;
  traits(): MessageTraitsInterface;
}
