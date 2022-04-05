import { Spectral } from "@stoplight/spectral-core";
import { asyncapi as aasRuleset } from "@stoplight/spectral-rulesets";

import { parse } from "./parse";
import { lint, validate } from "./lint";
import { registerSchemaParser } from './schema-parser';

import type { IConstructorOpts } from "@stoplight/spectral-core";
import type { ParseInput, ParseOptions } from "./parse";
import type { LintOptions, ValidateOptions } from "./lint";
import type { SchemaParser } from './schema-parser';

export interface ParserOptions {
  spectral?: Spectral | IConstructorOpts;
}

export class Parser {
  public readonly parserRegistry = new Map<string, SchemaParser>();
  public readonly spectral: Spectral;

  constructor(options?: ParserOptions) {
    const { spectral } = options || {};
    if (spectral instanceof Spectral) {
      this.spectral = spectral;
    } else {
      this.spectral = new Spectral(spectral);
    }

    // TODO: fix type
    this.spectral.setRuleset(aasRuleset as any);
  }

  parse(asyncapi: ParseInput, options?: ParseOptions) {
    return parse(this, asyncapi, options);
  }

  lint(asyncapi: ParseInput, options?: LintOptions) {
    return lint(this, asyncapi, options);
  }

  validate(asyncapi: ParseInput, options?: ValidateOptions) {
    return validate(this, asyncapi, options);
  }

  registerSchemaParser(parser: SchemaParser) {
    return registerSchemaParser(this, parser);
  }
}
