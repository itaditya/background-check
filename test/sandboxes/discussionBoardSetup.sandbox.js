require('dotenv').config({path: '../../.env'})
const githubClient = require('probot/lib/github')()

const createDiscussionRepo = require('../../lib/github-api/createDiscussionRepo')
const addCollaboratorToRepo = require('../../lib/github-api/addCollaboratorToRepo')

module.exports = async context => {
  githubClient.authenticate({
    type: 'token',
    token: process.env.GITHUB_ACCESS_TOKEN
  })
  const discussionBoardSetup = require('../../lib/discussionBoardSetup')({
    dependencies: {
      createDiscussionRepo,
      addCollaboratorToRepo,
      githubClient
    }
  })

  const appInstallerName = 'itaditya-' + Math.random()

  Object.assign(context.payload, {
    installation: {
      account: {
        login: appInstallerName
      }
    },
    sender: {
      login: 'bkeepers'
    }
  })
  await discussionBoardSetup(context)
}
