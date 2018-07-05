const getCommentsOnIssue = require('../../lib/github-api/getCommentsOnIssue')

module.exports = async context => {
  const result = await getCommentsOnIssue(context.github, {
    owner: 'itaditya',
    repo: 'maintainers-discussion',
    issueNum: 2
  })
  const { data: comments } = result
  console.log('First Comment: \n', comments[0])
}
