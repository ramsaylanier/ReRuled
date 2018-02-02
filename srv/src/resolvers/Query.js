const isLoggedIn = (ctx) => {
  if (!ctx.request.user) throw new Error(`Not logged in`)
  return ctxUser(ctx)
}

const ctxUser = (ctx) => ctx.request.user

const Query = {
  games(parent, args, ctx, info) {
    return ctx.db.query.games()
  },

  me(parent, args, ctx, info) {
    const { auth0id } = isLoggedIn(ctx)
    return ctx.db.query.user({ where: { auth0id }}, info)
  },
}

module.exports = { Query }
