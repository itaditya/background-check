module.exports = (github, { appInstallerName, username }) => {
  return github.repos.addCollaborator({
    username,
    owner: process.env.APP_ORG_NAME,
    repo: `${appInstallerName}-discussions`,
    permission: 'push'
  })
}
