/**
 * createDiscussionRepo github-api method used to create a discussion repo for a user/org in probot-background-check org
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.owner - name of user/org for whose repo's will be scanned for toxic users and their discussion will be held in owner-discussions repo.
 * @returns {Promise<object>}
 */

module.exports = (github, { owner }) => {
  return github.repos.createForOrg({
    org: 'probot-background-check',
    name: `${owner}-discussions`,
    description: 'Repo to have discussions about toxic users',
    // private: true,
    auto_init: true
  })
}
