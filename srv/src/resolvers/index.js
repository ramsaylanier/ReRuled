const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { game } = require('./Mutation/game')
const { rule } = require('./Mutation/rule')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...game,
    ...rule
  }
}
