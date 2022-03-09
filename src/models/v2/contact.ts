import { ContactInterface } from "models/contact";
import { V2BaseModel } from "./base";

export class V2Contact extends V2BaseModel implements ContactInterface {
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