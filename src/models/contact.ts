import { BaseModel } from "./base";

export interface ContactInterface extends BaseModel {
    name(): string;
    url(): string;
    email(): string;
}