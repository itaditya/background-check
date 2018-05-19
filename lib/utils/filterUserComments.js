module.exports = (comments, username) => {
  const userComments = comments.filter(comment => comment.user.login === username)
  return userComments
}
