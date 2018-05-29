module.exports = (context, { owner, username }) => {
  return context.github.issues.create({
    owner,
    repo: 'maintainers-discussion',
    title: `${username}-discussion`,
    body: `@${username} has been found out to be hostile in the past.
      This issue is opened so that maintainers can discuss about it.`
  })
}
