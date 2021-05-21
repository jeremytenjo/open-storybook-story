const vscode = require('vscode')
const removeFromArray = require('../../../utils/removeFromArray')

module.exports = function getStoryUrl(fileUri) {
  const userConfig = vscode.workspace.getConfiguration('openStorybookStory')

  // TODO get npx sb extract to work to provide story urls
  // https://storybook.js.org/docs/react/workflows/storybook-composition

  const storiesRootFolder = userConfig.storyFilesLocationGlob.split('/').shift()

  let storyPath =
    userConfig.rootPath +
    '-' +
    removeFromArray(fileUri, storiesRootFolder, {
      split: '/',
      join: '-'
    })

  const workspacePath = vscode.workspace.workspaceFolders[0].uri.path
  console.log(workspacePath)
  console.log(fileUri)
  console.log({ path: fileUri.replace(workspacePath, '') })
  console.log(storyPath)
  storyPath = storyPath.split('.')[0].split('-')
  storyPath.pop()
  storyPath = storyPath.join('-')

  const storyUrl = {
    url: `http://localhost:${userConfig.storybookPort}/?path=/source/${storyPath}`,
    label: storyPath
  }

  return storyUrl
}
