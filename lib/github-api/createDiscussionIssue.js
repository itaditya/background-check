/**
 * createDiscussionIssue github-api method used to open an issue in **probot-background-check/{{owner}}-maintainers-discussion** repo. The issue description will have a list of the toxic comments of user in non increasing order of their toxicity.
 * @param {object} github - authenticated github client
 * @param {object} data
 * @param {string} data.owner - owner of repo
 * @param {string} data.username - username to create issue for in the **probot-background-check/{{data.owner}}-maintainers-discussion** repo
 * @param {array} data.toxicComments - list of toxicComments of the {{data.username}} user
 * @returns {Promise<object>}
 */

module.exports = (github, { owner, username, toxicComments }) => {
  toxicComments.sort((a, b) => b.toxicScore - a.toxicScore) // sort in decreasing toxicScore order
  const toxicDataText = toxicComments.map(({ link, text, toxicScore }) => `
   1. ${link} has a toxicity rating of **${toxicScore}** :

       > ${text}
       
`).join('\n')

  return github.issues.create({
    owner: process.env.APP_ORG_NAME,
    repo: `${owner}-discussions`,
    title: `${username}-discussion`,
    body: `Some comments from @${username} have been found to be toxic. Review the following comments and discuss whether or not you would like to allow this contributor to participate in your community.

${toxicDataText}`
  })
}
