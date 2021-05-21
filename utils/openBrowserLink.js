const vscode = require('vscode')

module.exports = function openBrowserLink(url) {
  vscode.env.openExternal(vscode.Uri.parse(url))
}
