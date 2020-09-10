/**
 * This script removes unnecessary and broken types from "types.d.ts" file.
 * Script should be run in root path of repository.
 */

const fs = require('fs');

const data = fs.readFileSync('types.d.ts', 'utf-8');
const namespaceRegex = /(declare namespace)[ A-Za-z]*{((.|\n)+?)(?!(};))}/g;
const newData = data.replace(namespaceRegex, '');

fs.writeFileSync('types.d.ts', newData, 'utf-8');
