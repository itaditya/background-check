/**
 * getUserDiscussionIssue github-api method
 * @param {object} context
 * @param {object} data
 * @param {string} data.owner - owner of repo
 * @param {string} data.username - username to search open issue for in the **owner/maintainers-discussion** repo
 * @returns {promise}
 */

module.exports = (context, { owner, username }) => {
  return context.github.search.issues({
    q: `repo:${owner}/maintainers-discussion is:issue is:open in:title ${username}-discussion`
  })
}
