import { InfoInterface } from "models/info";
import { V3BaseModel } from "./base";
import { V3Contact } from "./contact";
import { V3License } from "./license";

export class V3Info extends V3BaseModel implements InfoInterface {
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

    contact(): V3Contact | undefined {
        const doc = this.json("contact");
        return doc && new V3Contact(doc);
    }

    license(): V3License | undefined {
        const doc = this.json("license");
        return doc &&  new V3License(doc);
    }
}