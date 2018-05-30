module.exports = ({ dependencies: { extractRepoDetails, getUserDiscussionIssue, getUserCommentedIssues, getCommentsOnIssue, sentimentAnalyser, createDiscussionIssue } }) => {
  const backgroundFinder = async(context) => {
    const owner = context.payload.repository.owner.login
    const username = context.payload.comment.user.login
    context.log(`Analyis for ${username} has started`)

    /* -- Check if user is already found hostile -- */
    const userIssueResult = await getUserDiscussionIssue(context, { owner, username })
    const alreadyFoundHostile = userIssueResult.data.total_count >= 1
    if (alreadyFoundHostile) {
      context.log(`${username} has already been found hostile before.\nTerminating ${username}'s analysis.`)
      return
    }
    /* ^- -^ */

    context.log(`${username} has not been found hostile before. \nCollection of Public Comments starting.`)
    const issuesResult = await getUserCommentedIssues(context, { username })
    const { data: { total_count, items: issues } } = issuesResult
    let total_user_comments = 0

    for (issue of issues) {
      // for each issue in search result
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
      let commentBlob = userComments.map(comment => comment.body).join('.\n')
      if (commentBlob.length <= 0) continue // empty commentBlob
      commentBlob = commentBlob.substr(0, 3000) // perspective api limits the text size to 3000B
      console.log('commentBlob', commentBlob)
      const toxicScore = await sentimentAnalyser(commentBlob)
      const isToxic = toxicScore >= 0.6
      context.log('toxicScore is', toxicScore)
      if (isToxic) {
        await createDiscussionIssue(context, {
          username,
          owner
        })
        break
      }
    }
  }

  return backgroundFinder
}
