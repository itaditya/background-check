/**
 * getCommentsOnIssue github-api method used to get a paginated list of comments on an issue.
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.owner - owner of repo
 * @param {string} data.repo - name of repo
 * @param {array} data.issueNum - issue number of the issue in {{data.owner}}/{{data.repo}} repository
 * @returns {Promise<object>}
 */

module.exports = (github, { owner, repo, issueNum }) => {
  return github.issues.getComments({
    owner,
    repo,
    number: issueNum
  })
}
