module.exports = (context, { owner, username, toxicComments }) => {
  toxicComments.sort((a, b) => b.toxicScore - a.toxicScore) // sort in decreasing toxicScore order
  const toxicDataText = toxicComments.map(({ link, text, toxicScore }) => `
   1. ${link} has a toxicity rating of **${toxicScore}** :
   
       > ${text}
  `).join('\n')

  return context.github.issues.create({
    owner,
    repo: 'maintainers-discussion',
    title: `${username}-discussion`,
    body: `Some comments from @${username} have been found to be toxic. Review the following comments and discuss whether or not you would like to allow this contributor to participate in your community.

${toxicDataText}`
  })
}
