const {forwardTo} = require('prisma-binding')
const { Prisma } = require('prisma-binding')

const getPrismaLink = (debug = false) => new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET, 
  debug: debug 
})

const isLoggedIn = (ctx) => {
  if (!ctx.request.user) throw new Error(`Not logged in`)
  return ctxUser(ctx)
}

const ctxUser = (ctx) => ctx.request.user

const Query = {
  games: forwardTo('db'),
  rule: forwardTo('db'),
  rules (parent, args, ctx, info) {
    return getPrismaLink().query.rules(args, info) 
  },
  ruleset: forwardTo('db'),
  rulesets: forwardTo('db'),
  game(parent, {gameId}, ctx, info) {
    return ctx.db.query.game({ where: { id: gameId }}, info)
  },
  me(parent, args, ctx, info) {
    const { auth0id } = isLoggedIn(ctx)
    return ctx.db.query.user({ where: { auth0id }}, info) 
  },
}

const Game = {
  ruleCount: async ({title}, args, ctx, info) => {
    const {id} = isLoggedIn(ctx)
    const rules = await ctx.db.query.rulesConnection({
      where: {
        AND: [{
          author: {id: id},
          game: {title: title}
        }]
      }
    }, `{ aggregate { count } }`)

    return rules.aggregate.count
  },
  rulesetCount: async ({title}, args, ctx, info) => {
    const {id} = isLoggedIn(ctx)
    const rulesets = await ctx.db.query.rulesetsConnection({
      where: {
        AND: [{
          author: {id: id},
          game: {title: title}
        }]
      }
    }, `{ aggregate { count } }`)

    return rulesets.aggregate.count
  }
}

module.exports = { Query, Game }
