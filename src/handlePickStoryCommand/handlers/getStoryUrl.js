const vscode = require('vscode')
const removeFromArray = require('../../../utils/removeFromArray')

module.exports = function getStoryUrl(fileUri) {
  const userConfig = vscode.workspace.getConfiguration('openStorybookStory')

  const storiesRootFolder = userConfig.storyFilesLocationGlob.split('/').shift()

  let storyPath =
    userConfig.rootPath +
    '-' +
    removeFromArray(fileUri, storiesRootFolder, {
      split: '/',
      join: '-'
    })

  storyPath = storyPath.split('.')[0].split('-')
  storyPath.pop()
  storyPath = storyPath.join('-')

  const storyUrl = {
    url: `http://localhost:${userConfig.storybookPort}/?path=/source/${storyPath}`,
    label: storyPath
  }

  return storyUrl
}
