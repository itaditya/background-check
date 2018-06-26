const getPublicComments = require('../../lib/getPublicComments')

module.exports = async context => {
  const comments = await getPublicComments(context.github, {
    username: 'itaditya'
  })
  console.log('First Comment: \n', comments[0])
  console.log('Comments Data', comments.map(comment => ({ url: comment.html_url, body: comment.body })))
}
