import { ContactInterface } from "./contact";
import { LicenseInterface } from "./license";

export interface InfoInterface {
    title(): string;
    version(): string;
    description(): string;
    termsOfService(): string;
    contact(): ContactInterface | undefined;
    license(): LicenseInterface | undefined;
}