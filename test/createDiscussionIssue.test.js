const createDiscussionIssue = require('../lib/github-api/createDiscussionIssue')

process.env.APP_ORG_NAME = 'probot-background-check'

test('createDiscussionIssue is working', async () => {
  const github = {
    issues: {
      create ({ owner, repo, title, body }) {
        expect(owner).toBe('probot-background-check')
        expect(repo).toBe('probot-discussions')
        expect(title).toBe('itaditya-discussion')
      }
    }
  }
  await createDiscussionIssue(github, {
    owner: 'probot',
    username: 'itaditya',
    toxicComments: [{
      link: 'link1',
      text: 'text1',
      toxicScore: 0.8
    }, {
      link: 'link2',
      text: 'text2',
      toxicScore: 0.9
    }]
  })
})
