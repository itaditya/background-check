/**
 * getUserDiscussionIssue github-api method
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.owner - owner of repo
 * @param {string} data.username - username to search open issue for in the **probot-background-check/{{data.owner}}-maintainers-discussion** repo
 * @returns {promise}
 */

module.exports = (github, { owner, username }) => {
  return github.search.issues({
    q: `repo:${process.env.APP_ORG_NAME}/${owner}-discussions is:issue is:open in:title ${username}-discussion`
  })
}
