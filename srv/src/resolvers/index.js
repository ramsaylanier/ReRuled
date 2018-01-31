const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { game } = require('./Mutation/game')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...game,
  }
}
