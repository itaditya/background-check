/**
 * getUserCommentedIssues **github-api method** used to search for issues in which **data.username** has commented.
 * @param {object} context
 * @param {object} data
 * @param {string} data.username - username to search commented isssues for
 * @returns {Promise<object>}
 */

module.exports = (context, { username }) => {
  return context.github.search.issues({
    q: `commenter:${username}`
  })
}
