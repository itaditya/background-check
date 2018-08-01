/**
 * createDiscussionRepo github-api method used to create a discussion repo named **{{appInstallerName}}-discussions** for a user/org in app's org in which discussion for users who have been hostile will be held.
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.appInstallerName - name of user/org who installed the app.
 * @returns {Promise<object>}
 */

module.exports = (github, { appInstallerName }) => {
  return github.repos.createForOrg({
    org: process.env.APP_ORG_NAME,
    name: `${appInstallerName}-discussions`,
    description: 'Repo to have discussions about toxic users',
    private: true,
    auto_init: true
  })
}
