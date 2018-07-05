const createDiscussionIssue = require('../../lib/github-api/createDiscussionIssue')

module.exports = async context => {
  const toxicComments = [{
    link: 'https://github.com/itaditya/gh-app-test-repo/issues/60',
    text: "what is the meaning of this, are you mad? Seriously how could you create such a sinister thing. I curse that your bot doesn't work",
    toxicScore: 0.7
  }, {
    link: 'https://github.com/itaditya/gh-app-test-repo/issues/60',
    text: "what is the meaning of this, are you mad? Seriously how could you create such a sinister thing. I curse that your bot doesn't work",
    toxicScore: 0.6
  }]
  const result = await createDiscussionIssue(context.github, {
    owner: 'itaditya',
    username: 'itaditya',
    toxicComments
  })
  console.log(result)
}
