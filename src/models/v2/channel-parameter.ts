import { BaseModel } from "../base";
import { Schema } from "./schema";

import { Mixin } from '../utils';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';

import type { ModelMetadata } from "../base";
import type { ChannelParameterInterface } from "../channel-parameter";
import type { SchemaInterface } from "../schema";

export class ChannelParameter extends Mixin(BaseModel, DescriptionMixin, ExtensionsMixin) implements ChannelParameterInterface {
  constructor(
    _json: Record<string,any>,
    protected readonly _meta: ModelMetadata & { id: string } = {} as any
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this._meta.id;
  }

  hasSchema(): boolean {
    return !!this._json.schema;
  }

  schema(): SchemaInterface | undefined {
    if (!this._json.schema) return undefined;
    return this.createModel(Schema, this._json.schema, { pointer: `${this._meta.pointer}/schema` });
  }

  hasLocation(): boolean {
    return !!this._json.location;
  }

  location(): string | undefined {
    return this._json.location;
  }
}
