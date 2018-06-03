module.exports = ({ dependencies: { extractRepoDetails, getUserDiscussionIssue, getUserCommentedIssues, getCommentsOnIssue, sentimentAnalyser, createDiscussionIssue } }) => {
  const backgroundFinder = async(context) => {
    if (context.isBot) return
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
    const { data: { items: issues } } = issuesResult
    const userToxicComments = []
    let userToxicCommentsLimit = 3
    let totalUserComments = 0

    for (let issue of issues) {
      // for each issue in search result
      const issueNum = issue.number
      const repoUrl = issue.repository_url
      context.log(`Fetching comments on ${issue.url}`)
      const { data: commentsOnIssue } = await getCommentsOnIssue(context, { issueNum, ...extractRepoDetails(repoUrl) })

      // we'll get 30 comments on issueNum issue
      const userCommentsOnIssue = [] // stores only the username's comments
      for (let comment of commentsOnIssue) {
        if (comment.user.type !== 'Bot' && comment.user.login === username) {
          userCommentsOnIssue.push(comment)
        }
      }
      totalUserComments += userCommentsOnIssue.length

      let commentBlob = userCommentsOnIssue.map(comment => comment.body).join('.\n')
      if (commentBlob.length <= 0) continue // empty commentBlob

      const toxicScore = await sentimentAnalyser(commentBlob.substr(0, 3000)) // perspective api limits the text size to 3000B
      const isToxic = toxicScore >= 0.6
      context.log('toxicScore is', toxicScore)
      if (isToxic) {
        userToxicCommentsLimit -= 1
        userToxicComments.push({
          link: issue.html_url,
          text: commentBlob,
          toxicScore
        })
      }

      if (userToxicCommentsLimit <= 0) {
        const { data: discussionIssueData } = await createDiscussionIssue(context, { username, owner, toxicComments: userToxicComments })
        context.log(`Discussion issue for ${username} has been created. Check out ${discussionIssueData.html_url}`)
        context.log(`${username}'s ${totalUserComments} comments were analysed`)
        break
      }
    }
  }

  return backgroundFinder
}
