const createDiscussionRepo = require('../lib/github-api/createDiscussionRepo')

test('createDiscussionRepo is working', async () => {
  const owner = 'test'
  const github = {
    repos: {
      createForOrg ({ org, name }) {
        expect(org).toBe('probot-background-check')
        expect(name).toBe(`${owner}-discussions`)
      }
    }
  }
  await createDiscussionRepo(github, { owner })
})
