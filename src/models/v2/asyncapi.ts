import { AsyncAPIDocumentInterface } from "models/asyncapi";
import { V2BaseModel } from "./base";
import { V2Info } from "./info";

export class V2AsyncAPIDocument extends V2BaseModel implements AsyncAPIDocumentInterface {
    version(): string {
        return this.json("asyncapi");
    }

    info(): V2Info {
        return new V2Info(this.json("info"));
    }
}
