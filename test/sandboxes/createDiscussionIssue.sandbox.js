const createDiscussionIssue = require('../../lib/github-api/createDiscussionIssue')

module.exports = async context => {
  const result = await createDiscussionIssue(context, {
    owner: 'itaditya',
    username: 'itaditya'
  })
  console.log(result);
}
