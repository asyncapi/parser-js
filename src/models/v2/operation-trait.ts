import { BaseModel } from "../base";
import { SecurityRequirements } from './security-requirements';
import { SecurityRequirement } from './security-requirement';

import { Mixin } from '../utils';
import { BindingsMixin } from './mixins/bindings';
import { DescriptionMixin } from './mixins/description';
import { ExtensionsMixin } from './mixins/extensions';
import { ExternalDocumentationMixin } from './mixins/external-docs';
import { TagsMixin } from './mixins/tags';

import type { ModelMetadata } from "../base";
import type { OperationKind } from "../operation";
import type { OperationTraitInterface } from "../operation-trait";
import type { SecurityRequirementsInterface } from "../security-requirements";

export class OperationTrait extends Mixin(BaseModel, BindingsMixin, DescriptionMixin, ExtensionsMixin, ExternalDocumentationMixin, TagsMixin) implements OperationTraitInterface {
  constructor(
    private readonly _id: string,
    _json: Record<string,any>,
    public readonly _meta: ModelMetadata & { kind: OperationKind } = {} as any,
  ) {
    super(_json, _meta);
  }

  id(): string {
    return this.operationId() || this._id;
  }

  kind(): OperationKind {
    return this._meta.kind;
  }

  hasOperationId(): boolean {
    return !!this._json.operationId;
  }

  operationId(): string | undefined {
    return this._json.operationId;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string | undefined {
    return this._json.summary;
  }

  security(): SecurityRequirementsInterface {
    return new SecurityRequirements((this._json.security || []).map((security: any, index: number) => {
      return this.createModel(SecurityRequirement, security, { pointer: `${this._meta.pointer}/security/${index}` })
    }));
  }
}
