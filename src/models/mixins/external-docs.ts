import { BaseModel } from "../base";

export interface ExternalDocsMixinInterface {
  hasExternalDocs(): boolean;
  externalDocs(): any; // TODO: Change type to ExternalDocs
}

export abstract class ExternalDocsMixin extends BaseModel implements ExternalDocsMixinInterface {
  hasExternalDocs(): boolean {
    return !!(this._json.externalDocs && Object.keys(this._json.externalDocs).length);
  };

  // TODO: implement it when the ExternalDocs class will be implemented 
  externalDocs(): any { 
    return;
  };
}
