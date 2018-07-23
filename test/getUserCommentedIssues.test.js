const getUserCommentedIssues = require('../lib/github-api/getUserCommentedIssues')

test('getUserCommentedIssues is working', async () => {
  const github = {
    search: { issues: jest.fn() }
  }

  await getUserCommentedIssues(github, {
    username: 'itaditya'
  })

  expect(github.search.issues.mock.calls).toMatchSnapshot()
})
