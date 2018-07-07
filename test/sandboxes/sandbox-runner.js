require('dotenv').config({path: '../../.env'})
const numOfArgs = process.argv.length

if (numOfArgs < 6) {
  console.log('Incorrect Usage')
  process.exit()
}

const sandboxNameArg = process.argv[numOfArgs - 1]
const sandboxName = sandboxNameArg.substr(2)

const sandbox = require(`./${sandboxName}.sandbox`)

module.exports = robot => {
  robot.on('sandbox', async context => {
    try {
      await sandbox(context)
    } catch (err) {
      console.log('err', err)
      console.log('Error Occured')
    } finally {
      process.exit()
    }
  })
}
