module.exports.getLibraryName = function () {
  return generateName(process.platform);
};

function getArch () {
  switch (process.arch) {
    case 'x64':
      return 'amd64';
    default:
      return process.arch;
  }
};

function generateName(platform) {
  switch (platform) {
    case 'darwin':
      return `cparser-darwin-10.6-${getArch()}.dylib`;
    case 'win32':
      return `cparser-windows-6.0-${getArch()}.dll`;
    case 'linux':
      return `cparser-linux-${getArch()}.so`;
    default:
      throw new Error(`Platform ${process.platform} not supported`);
  }
}