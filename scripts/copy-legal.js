// Copy the monorepo-root legal and readme files into the package being published.
// npm only packs files that exist inside the package directory, so without this the published tarballs
// contain no LICENSE and no NOTICE - see the "files" array in each packages/*/package.json.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkg = process.cwd();

for (const name of ['LICENSE', 'NOTICE']) {
  fs.copyFileSync(path.join(root, name), path.join(pkg, name));
}

// Only fall back to the monorepo README for packages that do not ship one of their own;
// @asyncapi/openapi-schema-parser has its own and it must not be overwritten.
if (!fs.existsSync(path.join(pkg, 'README.md'))) {
  fs.copyFileSync(path.join(root, 'README.md'), path.join(pkg, 'README.md'));
}
