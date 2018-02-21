const { Query, Game } = require('./Query')
const { auth } = require('./Mutation/auth')
const { game } = require('./Mutation/game')
const { rule } = require('./Mutation/rule')
const { ruleset } = require('./Mutation/ruleset')
const { ruleSub } = require('./Subscription/ruleAdded')

module.exports = {
  Query,
  Game,
  Mutation: {
    ...auth,
    ...game,
    ...rule,
    ...ruleset
  },
  Subscription: {
    ruleAdded: ruleSub
  }
}
