import { AsyncAPIDocumentInterface } from "../../models/asyncapi";
import { BaseModel } from "../base";
import { InfoV3 } from "./info";

export class AsyncAPIDocumentV3 extends BaseModel implements AsyncAPIDocumentInterface {
    version(): string {
        return this.json("asyncapi");
    }

    info(): InfoV3 {
        return new InfoV3(this.json("info"));
    }
}
