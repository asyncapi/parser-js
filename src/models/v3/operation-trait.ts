import { BaseModel } from '../base';
import { SecurityScheme } from './security-scheme';

import { bindings, hasDescription, description, extensions, hasExternalDocs, externalDocs, tags } from './mixins';

import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { OperationAction } from '../operation';
import type { OperationTraitInterface } from '../operation-trait';
import type { TagsInterface } from '../tags';

import type { v3 } from '../../spec-types';
import { SecurityRequirements } from '../security-requirements';
import { SecurityRequirement } from './security-requirement';

export class OperationTrait<J extends v3.OperationTraitObject = v3.OperationTraitObject> extends BaseModel<J, { id: string | undefined, action: OperationAction | undefined }> implements OperationTraitInterface {
  id(): string | undefined {
    return this._meta.id;
  }

  action(): OperationAction | undefined {
    return this._meta.action;
  }

  hasId(): boolean {
    return this.id() === undefined;
  }

  hasSummary(): boolean {
    return !!this._json.summary;
  }

  summary(): string | undefined {
    return this._json.summary;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  isSend(): boolean {
    return this.action() === 'send';
  }

  isReceive(): boolean {
    return this.action() === 'receive';
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }

  security(): SecurityRequirements[] {
    const securitySchemes = (this._meta?.asyncapi?.parsed?.components?.securitySchemes || {}) as Record<string, v3.SecuritySchemeObject>;
    return (this._json.security || []).map((requirement, index) => {
      const requirements: SecurityRequirement[] = [];
      Object.entries(requirement).forEach(([security, scopes]) => {
        const scheme = this.createModel(SecurityScheme, securitySchemes[security], { id: security, pointer: `/components/securitySchemes/${security}` });
        requirements.push(
          this.createModel(SecurityRequirement, { scheme, scopes }, { id: security, pointer: `${this.meta().pointer}/security/${index}/${security}` })
        );
      });
      return new SecurityRequirements(requirements);
    });
  }

  tags(): TagsInterface {
    return tags(this);
  }

  bindings(): BindingsInterface {
    return bindings(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }
}