const backgroundFinder = require('./lib/backgroundFinder')

module.exports = (robot) => {
  robot.log('bot started')
  robot.on('issue_comment.created', context => {
    context.log('event received')
    context.log('repo details', context.repo())
    backgroundFinder(context)
  })
}
