// Copy the monorepo-root legal and readme files into the package being published.
// npm only packs files that exist inside the package directory, so without this the published tarballs
// contain no LICENSE, no NOTICE and no README - see the "files" array in each packages/*/package.json.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
for (const name of ['LICENSE', 'NOTICE', 'README.md']) {
  fs.copyFileSync(path.join(root, name), path.join(process.cwd(), name));
}
