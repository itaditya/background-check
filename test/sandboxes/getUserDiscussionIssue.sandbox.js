const getUserDiscussionIssue = require('../../lib/github-api/getUserDiscussionIssue')

module.exports = async context => {
  const userIssueResult = await getUserDiscussionIssue(context.github, {
    username: 'itaditya',
    owner: 'itaditya'
  })
  console.log('userIssueResult.data.total_count', userIssueResult.data.total_count)
}
