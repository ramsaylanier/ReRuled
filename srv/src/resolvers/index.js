const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { game } = require('./Mutation/game')
const { rule } = require('./Mutation/rule')
const { ruleset } = require('./Mutation/ruleset')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...game,
    ...rule,
    ...ruleset
  }
}
