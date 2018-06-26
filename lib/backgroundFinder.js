/**
 * backgroundFinder module
 * @param {object} params
 * @param {object} params.dependencies - accepts the dependecies following **dependency inversion principle**.
 * @param {extractRepoDetails} params.dependencies.extractRepoDetails - utility to extract owner and repo name from **repoUrl**.
 * @param {getUserDiscussionIssue} params.dependencies.getUserDiscussionIssue - github-api method to search issue for user in maintainers-discussion repo.
 * @param {getUserCommentedIssues} params.dependencies.getUserCommentedIssues - github-api method to search issues on which user commented.
 * @param {getCommentsOnIssue} params.dependencies.getCommentsOnIssue - github-api method to fetch comments of an issue.
 * @param {sentimentAnalyser} params.dependencies.sentimentAnalyser - utility to analyse sentiment of a comment.
 * @param {createDiscussionIssue} params.dependencies.createDiscussionIssue - github-api method to create issue for a hostile user in **maintainers-discussion** repo.
 * @returns {backgroundFinder}
 * @example
 * const backgroundFinder = backgroundFinderModule({ dependencies: {} })
 */

const backgroundFinderModule = ({ dependencies: { extractRepoDetails, getUserDiscussionIssue, getUserCommentedIssues, getCommentsOnIssue, sentimentAnalyser, createDiscussionIssue } }) => {
  /**
   * backgroundFinder method
   * @param {object} context - context argument.
   * @returns {promise}
   * @example
   * await backgroundFinder(context)
   */
  const backgroundFinder = async(context) => {
    if (context.isBot) return
    const { github } = context
    const owner = context.payload.repository.owner.login
    const username = context.payload.comment.user.login
    context.log(`Analyis for ${username} has started`)

    /* -- Check if user is already found hostile -- */
    const userIssueResult = await getUserDiscussionIssue(github, { owner, username })
    const alreadyFoundHostile = userIssueResult.data.total_count >= 1
    if (alreadyFoundHostile) {
      context.log(`${username} has already been found hostile before.\nTerminating ${username}'s analysis.`)
      return
    }
    /* ^- -^ */

    context.log(`${username} has not been found hostile before. \nCollection of Public Comments starting.`)
    const issuesResult = await getUserCommentedIssues(github, { username })
    const { data: { items: issues } } = issuesResult
    const userToxicComments = []
    let userToxicCommentsLimit = 3
    let totalUserComments = 0

    for (let issue of issues) {
      // for each issue in search result
      const issueNum = issue.number
      const repoUrl = issue.repository_url
      context.log(`Fetching comments on ${issue.url}`)
      const { data: commentsOnIssue } = await getCommentsOnIssue(github, { issueNum, ...extractRepoDetails(repoUrl) })

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
        const { data: discussionIssueData } = await createDiscussionIssue(github, { username, owner, toxicComments: userToxicComments })
        context.log(`Discussion issue for ${username} has been created. Check out ${discussionIssueData.html_url}`)
        context.log(`${username}'s ${totalUserComments} comments were analysed`)
        break
      }

      if (totalUserComments > 100) {
        context.log(`More than 100 comments of ${username} have been analyzed & it is concluded that he is not hostile.`)
        break
      }
    }
  }

  return backgroundFinder
}

module.exports = backgroundFinderModule
