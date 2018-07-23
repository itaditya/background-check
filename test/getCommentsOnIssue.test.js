const getCommentsOnIssue = require('../lib/github-api/getCommentsOnIssue')

test('getCommentsOnIssue is working', async () => {
  const github = {
    issues: { getComments: jest.fn() }
  }
  await getCommentsOnIssue(github, {
    owner: 'itaditya',
    repo: 'private-gh-app-test-repo',
    issueNum: 1
  })

  expect(github.issues.getComments.mock.calls).toMatchSnapshot()
})
