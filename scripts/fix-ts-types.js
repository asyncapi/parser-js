/**
 * This script removes unnecessary and broken types from "types.d.ts" file.
 * Script should be run on repository's root path.
 * 
 * Example
 *
 * This:
 * 
 * declare namespace MixinExternalDocs {
 *   function hasExternalDocs(): boolean;
 *   function externalDocs(): ExternalDocs | null;
 * }
 *
 * declare interface MixinExternalDocs {
 * }
 * 
 * will be shortened to this:
 * 
 * declare interface MixinExternalDocs {
 * }
 */

const fs = require('fs');
const path = require('path');

const tsFile = path.resolve(__dirname, '../types.d.ts');

const data = fs.readFileSync(tsFile, 'utf-8');

/**
 * Find `declare namespace XYZ {...}` declaration and remove it
 */
const namespaceRegex = /(declare namespace)[ A-Za-z]*{((.|\n)+?)(?!(};))}/g;
const newData = data.replace(namespaceRegex, '');

fs.writeFileSync(tsFile, newData, 'utf-8');
