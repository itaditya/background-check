const request = require('superagent')

const extractRepoDetails = require('../../lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('../../lib/utils/analyseSentiment')
const getUserCommentedIssues = require('../../lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('../../lib/github-api/getCommentsOnIssue')
const backgroundFinder = require('../../lib/backgroundFinder')({
  dependencies: {
    extractRepoDetails,
    getUserCommentedIssues,
    getCommentsOnIssue,
    analyseSentiment,
    request
  }
})

module.exports = async context => {
  await backgroundFinder(context)
}
