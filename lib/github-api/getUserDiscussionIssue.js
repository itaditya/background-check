module.exports = (context, { owner, username }) => {
  return context.github.search.issues({
    q: `repo:${owner}/maintainers-discussion is:issue in:title ${username}-discussion`
  })
}
