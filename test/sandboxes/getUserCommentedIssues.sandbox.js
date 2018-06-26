const getUserCommentedIssues = require('../../lib/github-api/getUserCommentedIssues')

module.exports = async context => {
  const result = await getUserCommentedIssues(context.github, {
    username: 'itaditya'
  })
  const { data: { total_count, items: issues } } = result
  console.log('Total Issues:', total_count)
  console.log('Fetched Issues:', issues.length)
  console.log('First Issue -\n', issues[0])
}
