/**
 * This script removes unnecessary and broken types from "types.d.ts" file.
 * Script should be run on repository's root path.
 */

const fs = require('fs');
const path = require('path');

const tsFile = path.resolve(__dirname, '../types.d.ts');

const data = fs.readFileSync(tsFile, 'utf-8');
const namespaceRegex = /(declare namespace)[ A-Za-z]*{((.|\n)+?)(?!(};))}/g;
const newData = data.replace(namespaceRegex, '');

fs.writeFileSync(tsFile, newData, 'utf-8');
