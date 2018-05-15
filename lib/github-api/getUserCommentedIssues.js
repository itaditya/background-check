module.exports = (context, { username }) => {
  return context.github.search.issues({
    q: `commenter:${username}`
  })
}
