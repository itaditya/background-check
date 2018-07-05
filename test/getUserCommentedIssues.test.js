const getUserCommentedIssues = require('../lib/github-api/getUserCommentedIssues')

test('getUserCommentedIssues is working', async () => {
  const github = {
    search: {
      issues ({ q }) {
        expect(q).toBe('commenter:itaditya')
      }
    }
  }
  await getUserCommentedIssues(github, {
    username: 'itaditya'
  })
})
