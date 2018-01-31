const { getUserId, Context } = require('../utils')

const Query = {
  games(parent, args, ctx, info) {
    return ctx.db.query.games()
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
