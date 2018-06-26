const getUserDiscussionIssue = require('../lib/github-api/getUserDiscussionIssue')

test('getUserDiscussionIssue is working', async () => {
  const github = {
    search: {
      issues ({ q }) {
        expect(q).toBe('repo:itaditya/maintainers-discussion is:issue is:open in:title itaditya-discussion')
      }
    }
  }
  await getUserDiscussionIssue(github, {
    owner: 'itaditya',
    username: 'itaditya'
  })
})
