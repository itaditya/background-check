module.exports = (repoUrl) => {
  const lastSlashIndex = repoUrl.lastIndexOf('/')
  const repo = repoUrl.substr(lastSlashIndex + 1)
  const repoRemovedUrl = repoUrl.slice(0, lastSlashIndex)
  const secondLastSlashIndex = repoRemovedUrl.lastIndexOf('/')
  const owner = repoRemovedUrl.substr(secondLastSlashIndex + 1)
  return { owner, repo }
}
