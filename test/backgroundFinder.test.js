require('dotenv').config()

const backgroundFinder = require('../lib/backgroundFinder')

const { PERSPECTIVE_API_KEY } = process.env
const analyseSentiment = jest.fn().mockReturnValue(jest.fn().mockReturnValue(0.7))
const extractRepoDetails = jest.fn().mockReturnValue({ owner: 'itaditya', repo: 'private-gh-app-test-repo' })
const getUserCommentedIssues = jest.fn().mockReturnValue({
  data: {
    total_count: 2,
    items: [{
      number: 15,
      repository_url: 'https://api.github.com/repos/aps120797/playground'
    }]
  }
})
const getCommentsOnIssue = jest.fn().mockReturnValue({
  data: [{
    user: {
      type: 'User',
      login: 'itaditya'
    }
  }]
})

const backgroundFinderInstance = backgroundFinder(PERSPECTIVE_API_KEY, {
  dependencies: {
    extractRepoDetails,
    getUserCommentedIssues,
    getCommentsOnIssue,
    analyseSentiment,
    request: {}
  }
})

const context = {
  payload: { comment: { user: { login: 'itaditya' } } }
}

test('backgroundFinder is working', async () => {
  await backgroundFinderInstance(context)
  expect(extractRepoDetails).toHaveBeenCalled()
  expect(analyseSentiment).toHaveBeenCalled()
  expect(getUserCommentedIssues).toHaveBeenCalled()
  expect(getCommentsOnIssue).toHaveBeenCalled()
})
