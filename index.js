require('dotenv').config()
const request = require('superagent')

const extractRepoDetails = require('./lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('./lib/utils/analyseSentiment')
const getUserCommentedIssues = require('./lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('./lib/github-api/getCommentsOnIssue')

const { PERSPECTIVE_API_KEY } = process.env
const sentimentAnalyser = analyseSentiment(process.env.PERSPECTIVE_API_KEY, {
  dependencies: { request }
})

const backgroundFinder = require('./lib/backgroundFinder')({
  dependencies: {
    extractRepoDetails,
    getUserCommentedIssues,
    getCommentsOnIssue,
    sentimentAnalyser
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
