const request = require('superagent')
require('dotenv').config()

const { PERSPECTIVE_API_KEY } = process.env
const extractRepoDetails = require('../../lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('../../lib/utils/analyseSentiment')
const getUserCommentedIssues = require('../../lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('../../lib/github-api/getCommentsOnIssue')
const backgroundFinder = require('../../lib/backgroundFinder')(PERSPECTIVE_API_KEY, {
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
