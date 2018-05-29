module.exports = ({ dependencies: { extractRepoDetails, getUserCommentedIssues, getCommentsOnIssue, analyseSentiment, request } }) => {
  const { PERSPECTIVE_API_KEY } = process.env

  const sentimentAnalyserInstance = analyseSentiment(PERSPECTIVE_API_KEY, {
    dependencies: { request }
  })

  const backgroundFinder = async (context) => {
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
      // const commentBlob = "@itaditya I don't like the way you do things, your library is a joke"
      const commentBlob = userComments.map(comment => comment.body).join('.\n')
      console.log('commentBlob', commentBlob)
      if (commentBlob.length < 1 || commentBlob.length > 3000) continue // perspective api text limit 3000
      const toxicScore = await sentimentAnalyserInstance(commentBlob)
      const isToxic = toxicScore >= 0.6
      context.log('toxicScore is', toxicScore)
      break
    }
  }

  return backgroundFinder
}
