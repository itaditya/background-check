const discussionBoardSetupModule = ({ dependencies: { createDiscussionRepo, addCollaboratorToRepo, githubClient } }) => {
  const discussionBoardSetup = async (context) => {
    const appInstallerName = context.payload.installation.account.login
    const sender = context.payload.sender.login
    try {
      context.log(`Creating discussion board for ${appInstallerName}`)
      await createDiscussionRepo(githubClient, { appInstallerName })
      context.log(`Discussion board for ${appInstallerName} has been setup successfully`)

      context.log(`Adding ${sender} as collaborator to ${appInstallerName}-discussions repo`)
      await addCollaboratorToRepo(githubClient, { appInstallerName, username: sender })
      context.log(`Successfully added ${sender} as collaborator`)
    } catch (error) {
      context.log(`Error in creating discussion board for ${appInstallerName}`)
      context.log(error)
    }
  }

  return discussionBoardSetup
}

module.exports = discussionBoardSetupModule
