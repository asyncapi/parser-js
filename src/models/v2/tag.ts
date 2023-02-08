import { BaseModel } from '../base';

import { hasDescription, description, extensions, hasExternalDocs, externalDocs } from './mixins';

import type { ExtensionsInterface } from '../extensions';
import  type{ ExternalDocumentationInterface } from '../external-documentation';
import type { TagInterface } from '../tag';

import type { v2 } from '../../spec-types';

export class Tag extends BaseModel<v2.TagObject> implements TagInterface {
  id(): string | undefined {
    return;
  }

  name(): string {
    return this._json.name;
  }

  hasDescription(): boolean {
    return hasDescription(this);
  }

  description(): string | undefined {
    return description(this);
  }

  extensions(): ExtensionsInterface {
    return extensions(this);
  }

  hasExternalDocs(): boolean {
    return hasExternalDocs(this);
  }

  externalDocs(): ExternalDocumentationInterface | undefined {
    return externalDocs(this);
  }
}
