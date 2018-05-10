module.exports = (robot) => {
  robot.log('bot started')
  robot.on(['installation.created', 'installation_repositories.added'], context => {
    context.log('event received')
    context.log('data received', context.payload)
  })
}
