module.exports = (github, { appInstallerName, username }) => {
  return github.repos.addCollaborator({
    username,
    owner: 'probot-background-check',
    repo: `${appInstallerName}-discussions`,
    permission: 'push'
  })
}
