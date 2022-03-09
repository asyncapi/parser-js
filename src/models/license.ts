import { BaseModel } from "./base";

export interface LicenseInterface extends BaseModel {
    name(): string;
    url(): string;
}