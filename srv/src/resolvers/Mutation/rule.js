const { isLoggedIn } = require('../../utils')

const { Prisma } = require('prisma-binding')

const getPrismaLink = (debug = false) => new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET, 
  debug: debug 
})

const rule = {
  async createRule(parent, { ruleText, game, categories }, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to create a game.')
    }

    const user = await ctx.db.mutation.updateUser(
      {
        data: {
          games: { connect: {id: game}}
        },
        where: {id: id} 
      }
    )

    return ctx.db.mutation.createRule(
      {
        data: {
          game: { connect: { id: game} },
          author: { connect: { id: id} },
          ruleText: ruleText,
          categories: { set: categories }
        },
      },
      info
    )
  },

  async deleteRule(parent, args, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    return getPrismaLink().mutation.deleteRule(args)
  }
}

module.exports = { rule }
