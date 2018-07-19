const createDiscussionRepo = require('../lib/github-api/createDiscussionRepo')

process.env.APP_ORG_NAME = 'probot-background-check'

test('createDiscussionRepo is working', async () => {
  const github = {
    repos: { createForOrg: jest.fn() }
  }

  // Call your function, which internally calls your above mock function
  await createDiscussionRepo(github, { appInstallerName: 'test-org' })

  // Test that your mock function has been called
  expect(github.repos.createForOrg).toHaveBeenCalledWith({
    org: 'probot-background-check',
    name: 'test-org-discussions',
    description: 'Repo to have discussions about toxic users',
    private: true,
    auto_init: true
  })

  // Test that your mock function has been called with the right arguments
  expect(github.repos.createForOrg.mock.calls).toMatchSnapshot()
})
