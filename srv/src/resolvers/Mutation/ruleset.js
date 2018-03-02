const { isLoggedIn } = require('../../utils')

const { Prisma } = require('prisma-binding')

const getPrismaLink = (debug = false) => new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET, 
  debug: debug 
})

const ruleset = {
  async createRuleset(parent, { name, game }, ctx, info) {
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

    return ctx.db.mutation.createRuleset(
      {
        data: {
          game: { connect: { id: game} },
          author: { connect: { id: id} },
          name: name,
        },
      },
      info
    )
  },

  async deleteRuleset(parent, args, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    return getPrismaLink().mutation.deleteRuleset(args)
  },

  async addRuleToRuleset(parent, {ruleId, rulesetId}, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    return ctx.db.mutation.updateRuleset({
      where: {id: rulesetId},
      data: {
        rules: {
          connect: {
            id: ruleId
          }
        }
      }
    })
  },

  async removeRulesFromRuleset(parent, {rulesetId, ruleIds}, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    const rulesToRemove = ruleIds.map(rule => ({id: rule}))

    return ctx.db.mutation.updateRuleset({
      where: {id: rulesetId},
      data: {
        rules: {
          disconnect: rulesToRemove
        }
      }
    }, info)
  }
}

module.exports = { ruleset }
