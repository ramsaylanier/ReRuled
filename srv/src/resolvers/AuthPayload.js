const { Context } = require('../utils')

const isLoggedIn = (ctx) => {
  if (!ctx.request.user) throw new Error(`Not logged in`)
  return ctxUser(ctx)
}

const ctxUser = (ctx) => ctx.request.user

const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) => {
    const { auth0id } = isLoggedIn(ctx)
    return ctx.db.query.user({ where: { auth0id } }, info)
  },
}

module.exports = { AuthPayload }