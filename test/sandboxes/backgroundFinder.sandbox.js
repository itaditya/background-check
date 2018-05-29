require('dotenv').config()
const request = require('superagent')

const extractRepoDetails = require('../../lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('../../lib/utils/analyseSentiment')
const getUserCommentedIssues = require('../../lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('../../lib/github-api/getCommentsOnIssue')

const sentimentAnalyser = analyseSentiment(process.env.PERSPECTIVE_API_KEY, {
  dependencies: { request }
})

const backgroundFinder = require('../../lib/backgroundFinder')({
  dependencies: {
    extractRepoDetails,
    getUserCommentedIssues,
    getCommentsOnIssue,
    sentimentAnalyser
  }
})

module.exports = async context => {
  await backgroundFinder(context)
}
