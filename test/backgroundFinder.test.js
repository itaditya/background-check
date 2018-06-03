const backgroundFinder = require('../lib/backgroundFinder')

/* -- Mocks -- */
const extractRepoDetails = jest.fn().mockReturnValue({ owner: 'itaditya', repo: 'private-gh-app-test-repo' })
const getUserDiscussionIssue = jest.fn().mockReturnValue({
  data: {
    total_count: 0
  }
})
const getUserCommentedIssues = jest.fn().mockReturnValue({
  data: {
    total_count: 3,
    items: [{
      number: 15,
      repository_url: 'https://api.github.com/repos/aps120797/playground',
      url: 'https://api.github.com/repos/aps120797/playground/issues/17',
      html_url: 'https://github.com/aps120797/playground/issues/17'
    }, {
      number: 15,
      repository_url: 'https://api.github.com/repos/aps120797/playground',
      url: 'https://api.github.com/repos/aps120797/playground/issues/17',
      html_url: 'https://github.com/aps120797/playground/issues/17'
    }, {
      number: 15,
      repository_url: 'https://api.github.com/repos/aps120797/playground',
      url: 'https://api.github.com/repos/aps120797/playground/issues/17',
      html_url: 'https://github.com/aps120797/playground/issues/17'
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
const sentimentAnalyser = jest.fn().mockReturnValue(0.7)
const createDiscussionIssue = jest.fn().mockReturnValue(Promise.resolve({
  status: 200,
  data: {
    html_url: 'https://github.com/itaditya/maintainers-discussion/issues/17'
  }
}))
/* ^- Mocks -^ */

const backgroundFinderInstance = backgroundFinder({
  dependencies: {
    extractRepoDetails,
    getUserDiscussionIssue,
    getUserCommentedIssues,
    getCommentsOnIssue,
    sentimentAnalyser,
    createDiscussionIssue
  }
})

test('backgroundFinder is working', async () => {
  const context = {
    payload: {
      repository: { owner: { login: 'itaditya' } },
      comment: { user: { login: 'itaditya' } }
    },
    log: console.log
  }
  await backgroundFinderInstance(context)
  expect(extractRepoDetails).toHaveBeenCalled()
  expect(getUserDiscussionIssue).toHaveBeenCalled()
  expect(getUserCommentedIssues).toHaveBeenCalled()
  expect(getCommentsOnIssue).toHaveBeenCalled()
  expect(sentimentAnalyser).toHaveBeenCalled()
  expect(createDiscussionIssue).toHaveBeenCalled()
})
