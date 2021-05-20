const handleFolderCreation = require('./handleFolderCreation')
const pkgJson = require('../package.json')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate() {
  console.log(`${pkgJson.name} activated!`)
  handleFolderCreation()
}

// this method is called when your extension is deactivated
function deactivate() {
  console.log(`${pkgJson.name} deactivated!`)
}

module.exports = {
  activate,
  deactivate
}
