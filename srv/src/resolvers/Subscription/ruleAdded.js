const { isLoggedIn } = require('../../utils')

const ruleSub = {
  async subscribe(parent, { where }, ctx, info) {
    return ctx.db.subscription.rule({},info)
  }
}

module.exports = { ruleSub }
