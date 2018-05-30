require('dotenv').config()
const request = require('superagent')

const extractRepoDetails = require('./lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('./lib/utils/analyseSentiment')
const getUserDiscussionIssue = require('./lib/github-api/getUserDiscussionIssue')
const getUserCommentedIssues = require('./lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('./lib/github-api/getCommentsOnIssue')
const createDiscussionIssue = require('./lib/github-api/createDiscussionIssue')

const { PERSPECTIVE_API_KEY } = process.env
const sentimentAnalyser = analyseSentiment(PERSPECTIVE_API_KEY, {
  dependencies: { request }
})

const backgroundFinder = require('./lib/backgroundFinder')({
  dependencies: {
    extractRepoDetails,
    getUserDiscussionIssue,
    getUserCommentedIssues,
    getCommentsOnIssue,
    sentimentAnalyser,
    createDiscussionIssue
  }
})

module.exports = (robot) => {
  robot.log('bot started')
  robot.on('issue_comment.created', context => {
    context.log('event received')
    context.log('repo details', context.repo())
    backgroundFinder(context)
  })
}
