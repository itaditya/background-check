const extractRepoDetails = require('./utils/extractRepoDetailsFromUrl')
const filterUserComments = require('./utils/filterUserComments')
const getUserCommentedIssues = require('./github-api/getUserCommentedIssues')
const getCommentsOnIssue = require('./github-api/getCommentsOnIssue')

module.exports = async(context, { username }) => {
  const issuesResult = await getUserCommentedIssues(context, { username })
  const { data: { total_count, items: issues } } = issuesResult
  console.log('total_count', total_count)
  const commentsResults = await getCommentsOnIssues(context, { issues })
  const userComments = getUserComments(commentsResults, username)
  return userComments
}

async function getCommentsOnIssues (context, { issues }) {
  const commentsPromises = issues
    .map(({ number, repository_url: url }) => getCommentsOnIssue(context, { issueNum: number, ...extractRepoDetails(url) }))
  return Promise.all(commentsPromises)
}

function getUserComments (commentsResults, username) {
  const userComments = []
  commentsResults.forEach(({ data: commentsData }) => {
    const userCommentsOnIssue = filterUserComments(commentsData, username)
    // userCommentsOnIssue is an array holding the wanted user's comment on current issue
    userComments.push(...userCommentsOnIssue) // flatten and store the array
  })
  // userComments hold all his comments on all issues
  return userComments
}
