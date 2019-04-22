module.exports.getLibraryName = function () {
  return generateName(process.platform);
};

function getArch () {
  switch (process.arch) {
    case 'x64':
      return 'amd64';
    default:
      throw new Error(`Architecture ${process.arch} not supported`);
  }
};

function generateName(platform) {
  switch (platform) {
    case 'darwin':
      return `cparser-darwin-${getArch()}.dylib`;
    case 'win32':
      return `cparser-windows-${getArch()}.dll`;
    case 'linux':
      return `cparser-linux-${getArch()}.so`;
    default:
      throw new Error(`Platform ${process.platform} not supported`);
  }
}