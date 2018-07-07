require('dotenv').config()
const request = require('superagent')
const githubClient = require('probot/lib/github')()

const extractRepoDetails = require('./lib/utils/extractRepoDetailsFromUrl')
const analyseSentiment = require('./lib/utils/analyseSentiment')
const getUserDiscussionIssue = require('./lib/github-api/getUserDiscussionIssue')
const getUserCommentedIssues = require('./lib/github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('./lib/github-api/getCommentsOnIssue')
const createDiscussionIssue = require('./lib/github-api/createDiscussionIssue')
const createDiscussionRepo = require('./lib/github-api/createDiscussionRepo')
const addCollaboratorToRepo = require('./lib/github-api/addCollaboratorToRepo')

const { PERSPECTIVE_API_KEY, GITHUB_ACCESS_TOKEN } = process.env
const sentimentAnalyser = analyseSentiment(PERSPECTIVE_API_KEY, {
  dependencies: { request }
})
githubClient.authenticate({
  type: 'token',
  token: GITHUB_ACCESS_TOKEN
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

const discussionBoardSetup = require('./lib/discussionBoardSetup')({
  dependencies: {
    createDiscussionRepo,
    addCollaboratorToRepo,
    githubClient
  }
})

module.exports = (robot) => {
  robot.log('bot started')

  robot.on('installation.created', context => {
    console.log('hello')
    discussionBoardSetup(context)
  })

  robot.on('issue_comment.created', context => {
    context.log('event received')
    context.log('repo details', context.repo())
    backgroundFinder(context)
  })
}
