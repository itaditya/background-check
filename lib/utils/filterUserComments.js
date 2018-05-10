module.exports = (comments, username) => {
  userComments = comments.filter(comment => comment.user.login === username)
  return userComments
}
