import { InfoInterface } from "../../models/info";
import { BaseModel } from "../base";
import { ContactV2 } from "./contact";
import { LicenseV2 } from "./license";

export class InfoV2 extends BaseModel implements InfoInterface {
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

    contact(): ContactV2 | undefined {
        const doc = this.json("contact");
        return doc && new ContactV2(doc);
    }

    license(): LicenseV2 | undefined {
        const doc = this.json("license");
        return doc &&  new LicenseV2(doc);
    }
}