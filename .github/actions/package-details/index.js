const core = require('@actions/core')
const path = require('path')

const workspace = process.env.GITHUB_WORKSPACE

async function run() {
  try {
    const dir = path.resolve(workspace)
    const packagePath = path.join(dir, 'package.json')
    const pkg = require(packagePath)
    const version = pkg.version.toString()
    const name = pkg.name.toString()

    core.setOutput('name', name)
    core.setOutput('version', version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()