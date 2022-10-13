import { tilde } from '../../utils';
import { BaseModel } from '../base';
import { OperationInterface } from '../operation';
import { Operations } from '../operations';
import { Operation } from './operation';

import type { AsyncAPIDocumentInterface } from '../asyncapi';

import type { v3 } from '../../spec-types';

export class AsyncAPIDocument extends BaseModel<v3.AsyncAPIObject> implements AsyncAPIDocumentInterface {
  version(): string {
    return this._json.asyncapi;
  }

  defaultContentType(): string | undefined {
    return this._json.defaultContentType;
  }

  hasDefaultContentType(): boolean {
    return !!this._json.defaultContentType;
  }

  info() {
    return null as any;
  }

  servers() {
    return null as any;
  }

  channels() {
    return null as any;
  }

  operations() {
    const operations: OperationInterface[] = Object.entries(this._json.operations || {}).map(([operationId, operation]) =>
      this.createModel(Operation, operation, { id: operationId, address: operationId, pointer: `/operations/${tilde(operationId)}` })
    )
    
    return new Operations(operations);
  }

  messages() {
    return null as any;
  }

  schemas() {
    return null as any;
  }

  securitySchemes() {
    return null as any;
  }

  components() {
    return null as any;
  }

  extensions() {
    return null as any;
  }
}
