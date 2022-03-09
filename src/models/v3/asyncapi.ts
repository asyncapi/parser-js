import { AsyncAPIDocumentInterface } from "models/asyncapi";
import { V3BaseModel } from "./base";
import { V3Info } from "./info";

export class V3AsyncAPIDocument extends V3BaseModel implements AsyncAPIDocumentInterface {
    version(): string {
        return this.json("asyncapi");
    }

    info(): V3Info {
        return new V3Info(this.json("info"));
    }
}
