const createDiscussionIssue = require('../lib/github-api/createDiscussionIssue')

test('createDiscussionIssue is working', async () => {
  const github = {
    issues: {
      create ({ owner, repo, title, body }) {
        expect(owner).toBe('probot')
        expect(repo).toBe('maintainers-discussion')
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
