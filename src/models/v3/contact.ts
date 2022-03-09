import { ContactInterface } from "models/contact";
import { V3BaseModel } from "./base";

export class V3Contact extends V3BaseModel implements ContactInterface {
    name(): string {
        return this.json("name");
    }

    url(): string {
        return this.json("url");
    }

    email(): string {
        return this.json("email");
    }
}