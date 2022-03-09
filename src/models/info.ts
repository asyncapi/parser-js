import { ContactInterface } from "./contact";
import { LicenseInterface } from "./license";
import { BaseModel } from "./base";

export interface InfoInterface extends BaseModel {
    title(): string;
    version(): string;
    description(): string;
    termsOfService(): string;
    contact(): ContactInterface | undefined;
    license(): LicenseInterface | undefined;
}