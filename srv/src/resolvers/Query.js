const isLoggedIn = (ctx) => {
  if (!ctx.request.user) throw new Error(`Not logged in`)
  return ctxUser(ctx)
}

const ctxUser = (ctx) => ctx.request.user

const Query = {
  games(parent, args, ctx, info) {
    return ctx.db.query.games(args)
  },

  rule(parent, args, ctx, info) {
    return ctx.db.query.rule(args)
  },

  ruleset(parent, args, ctx, info) {
    return ctx.db.query.ruleset(args)
  },

  me(parent, args, ctx, info) {
    const { auth0id } = isLoggedIn(ctx)
    return ctx.db.query.user({ where: { auth0id }}, info) 
  },
}

module.exports = { Query }
