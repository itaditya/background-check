const request = require('superagent')

const { PERSPECTIVE_API_KEY } = process.env

const extractRepoDetails = require('./lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('./lib/utils/analyseSentiment')
const getUserCommentedIssues = require('./lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('./lib/github-api/getCommentsOnIssue')
const backgroundFinder = require('./lib/backgroundFinder')(PERSPECTIVE_API_KEY, {
  dependencies: {
    extractRepoDetails,
    getUserCommentedIssues,
    getCommentsOnIssue,
    analyseSentiment,
    request
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
