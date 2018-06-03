module.exports = (context, { owner, username, toxicComments }) => {
  const toxicDataText = toxicComments.map(({ link, text, toxicScore }) => `
   1. ${link} has a toxicity rating of **${toxicScore}** :
   
       > ${text}
  `).join('\n')
  console.log('toxicDataText', toxicDataText)
  return context.github.issues.create({
    owner,
    repo: 'maintainers-discussion',
    title: `${username}-discussion`,
    body: `Some comments from @${username} have been found to be toxic. Review the following comments and discuss whether or not you would like to allow this contributor to participate in your community.

${toxicDataText}`
  })
}
