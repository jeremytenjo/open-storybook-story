const vscode = require('vscode')
const openBrowserLink = require('../../utils/openBrowserLink')
const getStoryUrl = require('./handlers/getStoryUrl')

module.exports = function handleKeyboardTrigger(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'openStorybookStory.pickStory',
      async () => {
        const userConfig =
          vscode.workspace.getConfiguration('openStorybookStory')
        const quickPick = vscode.window.createQuickPick()

        try {
          const storiesList = await vscode.workspace.findFiles(
            userConfig.storyFilesLocationGlob,
            '**​/node_modules/**',
            5000
          )

          if (!storiesList.length) {
            vscode.window.showInformationMessage(
              `No stories found using glob ${userConfig.storyFilesLocationGlob}`
            )
            return quickPick.dispose()
          }

          const options = storiesList.map((story) => {
            const storyUrl = getStoryUrl(story.path)
            return { label: storyUrl.label, url: storyUrl.url }
          })

          quickPick.items = options

          quickPick.onDidChangeSelection((selection) => {
            const [selectedStory] = selection
            openBrowserLink(selectedStory.url)
          })

          quickPick.onDidHide(() => quickPick.dispose())

          quickPick.show()
        } catch (error) {
          console.log(error)
          quickPick.dispose()
        }
      }
    )
  )
}
