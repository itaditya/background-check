/**
 * getUserCommentedIssues **github-api method** used to search for issues in which **{{data.username}}** has commented.
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.username - username to search commented isssues for
 * @returns {Promise<object>}
 */

module.exports = (github, { username }) => {
  return github.search.issues({
    q: `commenter:${username}`
  })
}
