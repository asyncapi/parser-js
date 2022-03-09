import { ContactInterface } from "../../models/contact";
import { BaseModel } from "../base";

export class ContactV3 extends BaseModel implements ContactInterface {
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