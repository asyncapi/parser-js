import { LicenseInterface } from "models/license";
import { V2BaseModel } from "./base";

export class V2License extends V2BaseModel implements LicenseInterface {
    name(): string {
        return this.json("name");
    }

    url(): string {
        return this.json("url");
    }
}