const handlePickStoryCommand = require('./handlePickStoryCommand')
const pkgJson = require('../package.json')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(`${pkgJson.name} activated!`)
  handlePickStoryCommand(context)
}

// this method is called when your extension is deactivated
function deactivate() {
  console.log(`${pkgJson.name} deactivated!`)
}

module.exports = {
  activate,
  deactivate
}
