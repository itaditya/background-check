const backgroundFinder = require('../lib/backgroundFinder')

/* -- Mocks -- */
const sentimentAnalyser = jest.fn().mockReturnValue(0.7)
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
    body: 'this project is the worst out there',
    user: {
      type: 'User',
      login: 'itaditya'
    }
  }]
})
/* ^- Mocks -^ */

const backgroundFinderInstance = backgroundFinder({
  dependencies: {
    extractRepoDetails,
    getUserCommentedIssues,
    getCommentsOnIssue,
    sentimentAnalyser
  }
})

test('backgroundFinder is working', async () => {
  const context = {
    payload: { comment: { user: { login: 'itaditya' } } },
    log: console.log
  }
  await backgroundFinderInstance(context)
  expect(extractRepoDetails).toHaveBeenCalled()
  expect(sentimentAnalyser).toHaveBeenCalled()
  expect(getUserCommentedIssues).toHaveBeenCalled()
  expect(getCommentsOnIssue).toHaveBeenCalled()
})
