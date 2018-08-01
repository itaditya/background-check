/**
 * addCollaboratorToRepo github-api method used to add collaborators to **probot-background-check/{{owner}}-maintainers-discussion** repo.
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.appInstallerName - individual / org account name on which app is installed
 * @param {string} data.username - username of user who installed the app.
 * @returns {Promise<object>}
 */

module.exports = (github, { appInstallerName, username }) => {
  return github.repos.addCollaborator({
    username,
    owner: process.env.APP_ORG_NAME,
    repo: `${appInstallerName}-discussions`,
    permission: 'push'
  })
}
