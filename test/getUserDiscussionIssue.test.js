const getUserDiscussionIssue = require('../lib/github-api/getUserDiscussionIssue')

process.env.APP_ORG_NAME = 'probot-background-check'

test('getUserDiscussionIssue is working', async () => {
  const github = {
    search: {
      issues ({ q }) {
        expect(q).toBe('repo:probot-background-check/itaditya-discussions is:issue is:open in:title itaditya-discussion')
      }
    }
  }
  await getUserDiscussionIssue(github, {
    owner: 'itaditya',
    username: 'itaditya'
  })
})
