const getComments = require('../../lib/github-api/getComments')

module.exports = async context => {
  const result = await getComments(context, {
    owner: 'itaditya',
    repo: 'gh-app-test-repo',
    issueNum: 1
  })
  const { data: comments } = result
  console.log('First Comment: \n', comments[0])
}
