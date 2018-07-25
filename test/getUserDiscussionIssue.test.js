const getUserDiscussionIssue = require('../lib/github-api/getUserDiscussionIssue')

process.env.APP_ORG_NAME = 'probot-background-check'

test('getUserDiscussionIssue is working', async () => {
  const github = {
    search: { issues: jest.fn() }
  }

  await getUserDiscussionIssue(github, {
    owner: 'itaditya',
    username: 'itaditya'
  })

  expect(github.search.issues.mock.calls).toMatchSnapshot()
})
