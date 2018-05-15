const backgroundFinder = require('../../lib/backgroundFinder')

module.exports = async context => {
  await backgroundFinder(context)
}
