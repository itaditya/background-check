const octokit = require('probot/lib/github')()

const createDiscussionRepo = require('../../lib/github-api/createDiscussionRepo')

module.exports = async context => {
  octokit.authenticate({
    type: 'token',
    token: process.env.GITHUB_ACCESS_TOKEN
  })
  await createDiscussionRepo(octokit, {
    appInstallerName: 'test-org'
  })
}
