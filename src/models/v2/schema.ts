import { BaseModel } from "../base";

import { Mixin } from '../utils';
import { ExtensionsMixin } from './mixins/extensions';

import type { SchemaInterface } from "models/schema";

export class Schema extends Mixin(BaseModel, ExtensionsMixin) implements SchemaInterface {}
