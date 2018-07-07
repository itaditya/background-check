const discussionBoardSetupModule = ({ dependencies: { createDiscussionRepo, githubClient } }) => {
  const discussionBoardSetup = async (context) => {
    const appInstallerName = context.payload.installation.account.login
    context.log(`Creating discussion board for ${appInstallerName}`)
    try {
      await createDiscussionRepo(githubClient, { appInstallerName })
      context.log(`Discussion board for ${appInstallerName} has been setup successfully`)
    } catch (error) {
      context.log(`Error in creating discussion board for ${appInstallerName}`)
      context.log(error)
    }
  }

  return discussionBoardSetup
}

module.exports = discussionBoardSetupModule
