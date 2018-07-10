/**
 * discussionBoardSetup module
 * @param {object} params
 * @param {object} params.dependencies - accepts the dependecies following **dependency inversion principle**.
 * @param {createDiscussionRepo} params.dependencies.createDiscussionRepo - github-api method to create private discussion repo for the app installer
 * @param {addCollaboratorToRepo} params.dependencies.addCollaboratorToRepo - github-api method to add collborator to discussion repo
 * @param {githubClient} params.dependencies.githubClient - authenticated githubClient with correct permissions
 * @returns {discussionBoardSetup}
 * @example
 * const discussionBoardSetup = discussionBoardSetupModule({ dependencies: {} })
 */

const discussionBoardSetupModule = ({ dependencies: { createDiscussionRepo, addCollaboratorToRepo, githubClient } }) => {
  /**
   * discussionBoardSetup method
   * @param {object} context - context argument.
   * @returns {promise}
   * @example
   * await discussionBoardSetup(context)
   */
  const discussionBoardSetup = async (context) => {
    const appInstallerName = context.payload.installation.account.login
    const sender = context.payload.sender.login
    try {
      context.log(`Creating discussion board for ${appInstallerName}`)
      await createDiscussionRepo(githubClient, { appInstallerName })
      context.log(`Discussion board for ${appInstallerName} has been setup successfully`)
      try {
        context.log(`Adding ${sender} as collaborator to ${appInstallerName}-discussions repo`)
        await addCollaboratorToRepo(githubClient, { appInstallerName, username: sender })
        context.log(`Successfully added ${sender} as collaborator`)
      } catch (error) {
        context.log(`Error in adding ${sender} as collaborator to ${appInstallerName}-discussions repo`)
        context.log(error)
      }
    } catch (error) {
      context.log(`Error in creating discussion board for ${appInstallerName}`)
      context.log(error)
    }
  }

  return discussionBoardSetup
}

module.exports = discussionBoardSetupModule
