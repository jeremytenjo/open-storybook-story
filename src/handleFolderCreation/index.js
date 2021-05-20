const vscode = require('vscode')
const changeCase = require('change-case')
const path = require('path')

const isUriAFolder = require('../../utils/folderFiles/isUriAFolder')
const splitPath = require('../../utils/splitPath')
const createFile = require('../../utils/folderFiles/createFile')
const openFile = require('../../utils/folderFiles/openFile')

module.exports = function handleFolderCreation() {
  const userConfig = vscode.workspace.getConfiguration('openStorybookStory')
  if (userConfig.disable) return

  let folders = vscode.workspace.workspaceFolders
  if (!folders) return

  let watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(folders[0], userConfig.dirToWatch)
  )

  watcher.onDidCreate(async (uri) => {
    const isFolder = await isUriAFolder(uri)
    if (!isFolder) return

    const split = splitPath(uri)
    const folderName = split.pop()
    let newFilePath = ''

    if (userConfig.outputIndexjs) newFilePath = path.join(uri.path, 'index.js')
    else {
      let fileName = changeCase[userConfig.fileNameCase](folderName)
      newFilePath = path.posix.join(
        uri.path,
        fileName + userConfig.fileExtension
      )
    }

    if (userConfig.ignoreFolders.length) {
      const ignoreFolder = userConfig.ignoreFolders.some((f) =>
        newFilePath.includes(f)
      )

      if (ignoreFolder) return
    }

    await createFile(newFilePath, '')
    openFile(newFilePath)
  })
}
