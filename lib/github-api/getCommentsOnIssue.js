module.exports = (context, { owner, repo, issueNum }) => {
  return context.github.issues.getComments({
    owner,
    repo,
    number: issueNum
  })
}
