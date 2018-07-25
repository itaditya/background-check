const createDiscussionIssue = require('../lib/github-api/createDiscussionIssue')

process.env.APP_ORG_NAME = 'probot-background-check'

test('createDiscussionIssue is working', async () => {
  const github = {
    issues: { create: jest.fn() }
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

  expect(github.issues.create.mock.calls).toMatchSnapshot()
})
