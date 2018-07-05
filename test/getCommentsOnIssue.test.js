const getCommentsOnIssue = require('../lib/github-api/getCommentsOnIssue')

test('getCommentsOnIssue is working', async () => {
  const github = {
    issues: {
      getComments ({ owner, repo, number }) {
        expect(owner).toBe('itaditya')
        expect(repo).toBe('private-gh-app-test-repo')
        expect(number).toBe(1)
      }
    }
  }
  await getCommentsOnIssue(github, {
    owner: 'itaditya',
    repo: 'private-gh-app-test-repo',
    issueNum: 1
  })
})
