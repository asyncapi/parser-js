import { InfoInterface } from "../../models/info";
import { BaseModel } from "../base";
import { ContactV3 } from "./contact";
import { LicenseV3 } from "./license";

export class InfoV3 extends BaseModel implements InfoInterface {
    title(): string {
        return this.json("title");
    }

    version(): string {
        return this.json("version");
    }

    description(): string {
        return this.json("description");
    }

    termsOfService(): string {
        return this.json("termsOfService");
    }

    contact(): ContactV3 | undefined {
        const doc = this.json("contact");
        return doc && new ContactV3(doc);
    }

    license(): LicenseV3 | undefined {
        const doc = this.json("license");
        return doc &&  new LicenseV3(doc);
    }
}