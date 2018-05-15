const extractRepoDetails = require('./utils/extractRepoDetailsFromUrl')
const getUserCommentedIssues = require('./github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('./github-api/getCommentsOnIssue')

module.exports = async(context) => {
  const username = 'itaditya'
  const issuesResult = await getUserCommentedIssues(context, { username })
  const { data: { total_count, items: issues } } = issuesResult
  let total_user_comments = 0
  for (issue of issues) {
    const issueNum = issue.number
    const repoUrl = issue.repository_url
    console.log('issueNum', issueNum, repoUrl)
    const { data: commentsOnIssue } = await getCommentsOnIssue(context, { issueNum, ...extractRepoDetails(repoUrl) })
    // we'll get 30 comments on issueNum issue
    const userComments = [] // stores only the username's comments
    for (comment of commentsOnIssue) {
      if (comment.user.type !== 'Bot' && comment.user.login === username) {
        userComments.push(comment)
      }
    }
    total_user_comments += userComments.length
    console.log('userComments.length', userComments.length)
    // break;
  }
  console.log('total_userIssues', total_userIssues)
}
