import { AsyncAPIDocumentInterface } from "../../models";
import { BaseModel } from "../base";
import { InfoV2 } from "./info";

export class AsyncAPIDocumentV2 extends BaseModel implements AsyncAPIDocumentInterface {
    version(): string {
        return this.json("asyncapi");
    }

    info(): InfoV2 {
        return new InfoV2(this.json("info"));
    }
}
